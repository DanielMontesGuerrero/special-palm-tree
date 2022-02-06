import Matrix from './Matrix';

export enum PieceType {
    KING,
    QUEEN,
    KNIGHT,
    BISHOP,
    PAWN,
    ROOK,
}

export interface CollisionContext {
  row: number;
  col: number;
  matrix: Matrix;
  playerId: number;
  pieceType: PieceType;
}
