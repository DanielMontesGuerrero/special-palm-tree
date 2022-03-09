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
      this.players.push(new Player(`bot ${i + 1}`, i));
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
      if (this.board.matrix.getCountOfAliveCells(playerId) === 0) {
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
      if (event !== undefined) {
        event.action({
          playerId: this.events[0].playerId,
          triggeredAt: this.events[0].triggeredAt,
          newActivePiece: this.events[0].newActivePiece,
          pieceType: this.events[0].pieceType,
          players: this.players,
          board: this.board,
          arrows: this.board.arrows,
        });
      } else {
        throw new Error('Invalid event code');
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

  getPlayerWithGreatestScore() {
    let playerId = -1;
    let maxScore = -1;
    for (let id = 0; id < 4; id++) {
      if (this.players[id].score > maxScore) {
        maxScore = this.players[id].score;
        playerId = id;
      }
    }
    return playerId;
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
}
