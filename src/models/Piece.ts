export enum PieceType {
    KING,
    QUEEN,
    KNIGHT,
    BISHOP,
    PAWN,
}

export class Piece {
  type: PieceType;

  quantity: number;

  isActive: boolean;

  constructor(piece: Piece) {
    this.type = piece.type;
    this.quantity = piece.quantity;
    this.isActive = piece.isActive;
  }
}
