import Message from './Message';
import Piece from './Piece';
import {MessageType, PieceType} from './types';

export default class MessageManager {
  messages: Message[];

  notifiedHalfCellsAlive = false;

  notifiedNineCellsAlive = false;

  notifiedDeadPlayer = [false, false, false, false];

  playerId: number;

  constructor(playerId: number) {
    this.messages = [];
    this.playerId = playerId;
  }

  pushRouletteOptionSelectedMessage(optionName: string) {
    this.messages.push(new Message(`New roulette effect: ${optionName}`));
  }

  pushPieceReleasedMessage(playerName: string, piece: Piece) {
    this.messages.push(new Message(`${playerName} is releasing ${piece.quantity} `
      + `${MessageManager.getPieceName(piece)}`));
  }

  pushAliveCellsMessage(aliveCells: number, totalCells: number) {
    if (aliveCells < (totalCells / 2) && !this.notifiedHalfCellsAlive) {
      this.messages.push(new Message(`Only ${aliveCells} cells alive!`, MessageType.WARNING));
      this.notifiedHalfCellsAlive = true;
    }
    if (aliveCells <= 9 && !this.notifiedNineCellsAlive) {
      this.messages.push(new Message(`Only ${aliveCells} cells alive!`, MessageType.WARNING));
      this.notifiedNineCellsAlive = true;
    }
  }

  pushDeadPlayerMessage(deadPlayer: number, playerName: string) {
    if (!this.notifiedDeadPlayer[deadPlayer]) {
      if (deadPlayer === this.playerId) {
        this.messages.push(new Message('You lose', MessageType.LOSE));
      } else {
        this.messages.push(new Message(`${playerName} is dead`, MessageType.DEAD_PLAYER));
      }
      this.notifiedDeadPlayer[deadPlayer] = true;
    }
  }

  static getPieceName(piece: Piece) {
    let name = '';
    switch (piece.type) {
      case PieceType.KING: name = 'King'; break;
      case PieceType.QUEEN: name = 'Queen'; break;
      case PieceType.BISHOP: name = 'Bishop'; break;
      case PieceType.KNIGHT: name = 'Knight'; break;
      case PieceType.ROOK: name = 'Rook'; break;
      case PieceType.PAWN: name = 'Pawn'; break;
      default: break;
    }
    if (piece.quantity > 1) {
      name += 's';
    }
    return name;
  }
}
