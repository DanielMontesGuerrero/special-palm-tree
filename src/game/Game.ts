import Board from './Board';
import Player from './Player';
import {EnqueuedEvent, Events} from './Event';
import {GamePhase, ScoreType} from './types';
import {Config} from '../config/config';

export default class Game {
  board: Board;

  players: Player[];

  events: EnqueuedEvent[];

  beginTime: number;

  endTime: number;

  winner: number;

  phase: GamePhase;

  static timeLimit = Config.timeLimit;

  constructor(players: string[]) {
    this.board = new Board(Config.rows, Config.cols);
    this.players = [];
    for (let i = 0; i < players.length; i++) {
      this.players.push(new Player(players[i], i));
    }
    for (let i = players.length; i < 4; i++) {
      this.players.push(new Player(`bot ${i}`, i));
    }
    this.events = [];
    this.beginTime = 0;
    this.endTime = 0;
    this.winner = -1;
    this.phase = GamePhase.IDLE;
  }

  start() {
    this.beginTime = Date.now();
    for (let playerId = 0; playerId < 4; playerId++) {
      this.players[playerId].messageManager.pushStartMessage();
    }
    this.phase = GamePhase.RUNNING;
  }

  stop() {
    this.addAliveCellsToScores();
    this.phase = GamePhase.FINISHED;
    this.endTime = Date.now();
    this.winner = this.getPlayerWithGreatestScore();
  }

  addEvent(event: EnqueuedEvent) {
    this.events.push(event);
  }

  update() {
    if (this.phase !== GamePhase.RUNNING) {
      return;
    }
    const killReporters = [];
    for (let playerId = 0; playerId < 4; playerId++) {
      killReporters.push(this.players[playerId].killReporter);
    }
    this.board.update(killReporters);
    for (let playerId = 0; playerId < 4; playerId++) {
      this.players[playerId].updateScore(ScoreType.KILL);
      this.players[playerId].messageManager.pushAliveCellsMessage(
        this.board.matrix.getCountOfAliveCells(playerId),
        this.board.matrix.getTotalCountOfCells(),
      );
      if (this.board.isPlayerDead(playerId)) {
        this.players[playerId].setDead();
        for (let notifyPlayerId = 0; notifyPlayerId < 4; notifyPlayerId++) {
          this.players[notifyPlayerId].messageManager.pushDeadPlayerMessage(
            playerId,
            this.players[playerId].name,
          );
        }
      }
    }
    this.processEvents();
    this.checkWinner();
    this.checkTimeLimit();
  }

  processEvents() {
    while (this.events.length > 0) {
      const event = Events.get(this.events[0].code);
      if (event === undefined) {
        throw new Error('Invalid event code');
      }
      if (!this.players[this.events[0].playerId].isDead) {
        event.action({
          playerId: this.events[0].playerId,
          triggeredAt: this.events[0].triggeredAt,
          newActivePiece: this.events[0].newActivePiece,
          pieceType: this.events[0].pieceType,
          players: this.players,
          board: this.board,
          arrows: this.board.arrows,
        });
      }
      this.events.shift();
    }
  }

  checkWinner() {
    const alivePlayers = this.board.getAlivePlayers();
    if (alivePlayers.length === 1) {
      [this.winner] = alivePlayers;
    } else if (alivePlayers.length === 0) {
      this.winner = this.getPlayerWithGreatestScore();
    }
    if (this.winner !== -1) {
      this.phase = GamePhase.FINISHED;
      for (let playerId = 0; playerId < 4; playerId++) {
        this.players[playerId].messageManager.pushWinnerMessage(
          this.winner,
          this.players[this.winner].name,
        );
      }
      this.endTime = Date.now();
    }
  }

  checkTimeLimit() {
    if (this.getRunningTime() >= Game.timeLimit) {
      for (let playerId = 0; playerId < 4; playerId++) {
        this.players[playerId].messageManager.pushTimeLimitMessage();
      }
      this.addAliveCellsToScores();
      this.winner = this.getPlayerWithGreatestScore();
      for (let playerId = 0; playerId < 4; playerId++) {
        this.players[playerId].messageManager.pushWinnerMessage(
          this.winner,
          this.players[this.winner].name,
        );
      }
      this.endTime = Date.now();
      this.phase = GamePhase.FINISHED;
    }
  }

  getPlayersOrderedByScore() {
    const orderedPlayers = this.players.map((a) => a).sort((a, b) => {
      if (a.isDead !== b.isDead) {
        if (a.isDead) return 1;
        if (b.isDead) return -1;
      }
      return b.score - a.score;
    });
    return orderedPlayers;
  }

  getPlayerWithGreatestScore() {
    const orderedPlayers = this.getPlayersOrderedByScore();
    return orderedPlayers[0].id;
  }

  getWinner() {
    if (this.winner === -1) {
      return this.getPlayerWithGreatestScore();
    }
    return this.winner;
  }

  getRunningTime() {
    if (this.phase === GamePhase.IDLE) {
      return 0;
    }
    if (this.phase === GamePhase.RUNNING) {
      return Date.now() - this.beginTime;
    }

    return this.endTime - this.beginTime;
  }

  addAliveCellsToScores() {
    const countOfAliveCells = this.board.getCountOfAliveCellsPerPlayer();
    this.players.forEach((player) => {
      player.messageManager.pushTiebreakerMessage(countOfAliveCells[player.id]);
      player.updateScore(ScoreType.ALIVE_CELL, null, countOfAliveCells[player.id]);
    });
  }
}
