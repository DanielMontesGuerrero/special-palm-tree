import Board from './Board';
import Player from './Player';
import {EnqueuedEvent, Events} from './Event';

const DefaultVaules = {
  rows: 42,
  cols: 42,
};

export default class Game {
  board: Board;

  players: Player[];

  events: EnqueuedEvent[];

  beginTime: number;

  endTime: number;

  winner: number;

  constructor() {
    this.board = new Board(DefaultVaules.rows, DefaultVaules.cols);
    this.players = [];
    this.events = [];
    this.beginTime = 0;
    this.endTime = 0;
    this.winner = -1;
  }

  addEvent(event: EnqueuedEvent) {
    this.events.push(event);
  }

  update() {
    this.board.update();
    for (let playerId = 0; playerId < 4; playerId++) {
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
        throw new Error('No valid event code');
      }
      this.events.shift();
    }
  }
}
