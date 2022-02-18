import MessageManager from './MessageManager';
import Piece from './Piece';
import Roulette from './Roulette';
import {PieceType} from './types';

export default class Player {
  name: string;

  id: number;

  score: number;

  hand: Piece[];

  roulette: Roulette;

  messageManager: MessageManager;

  activePiece: Piece;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
    this.hand = [
      new Piece(PieceType.KING),
      new Piece(PieceType.QUEEN),
      new Piece(PieceType.BISHOP),
      new Piece(PieceType.KNIGHT),
      new Piece(PieceType.ROOK),
      new Piece(PieceType.PAWN, 1, true),
    ];
    [,,,, this.activePiece] = this.hand;
    this.score = 0;
    this.roulette = new Roulette();
    this.messageManager = new MessageManager(id);
  }

  changeActivePiece(index: number) {
    this.activePiece.isActive = false;
    this.activePiece = this.hand[index];
    this.activePiece.isActive = true;
  }
}
