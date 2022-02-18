import {PieceType} from './types';
import Matrix from './Matrix';

export interface CollisionContext {
  row: number;
  col: number;
  matrix: Matrix;
  playerId: number;
  pieceType: PieceType;
}

export const stats = {
  QUEEN: {
    attack: 80,
    defense: 10,
    health: 10,
  },
  KNIGHT: {
    attack: 40,
    defense: 0,
    health: 0,
  },
  BISHOP: {
    attack: 0,
    defense: 0,
    health: 60,
  },
  ROOK: {
    attack: 0,
    defense: 80,
    health: 0,
  },
  PAWN: {
    attack: 20,
    defense: 0,
    health: 0,
  },
};

export default class Piece {
  type: PieceType;

  quantity: number;

  isActive: boolean;

  constructor(type: PieceType, quantity = 0, isActive = false) {
    this.type = type;
    this.quantity = quantity;
    this.isActive = isActive;
  }

  clear() {
    this.quantity = 0;
  }

  static applyEffect(ctx: CollisionContext) {
    let dx = [];
    let dy = [];
    switch (ctx.pieceType) {
      case PieceType.QUEEN:
        dx = [-1, 0, 1];
        dy = [-1, 0, 1];
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            const row = (ctx.row + dy[i] + ctx.matrix.rows) % ctx.matrix.rows;
            const col = (ctx.col + dx[j] + ctx.matrix.cols) % ctx.matrix.cols;
            if (ctx.matrix.getPlayerId(row, col) !== ctx.playerId) {
              ctx.matrix.get(row, col).applyDamage(stats.QUEEN.attack);
            } else {
              ctx.matrix.get(row, col).applyDefense(stats.QUEEN.defense);
              ctx.matrix.get(row, col).applyHealth(stats.QUEEN.health);
            }
          }
        }
        break;
      case PieceType.BISHOP:
        ctx.matrix.get(ctx.row, ctx.col).applyHealth(stats.BISHOP.health);
        break;
      case PieceType.KNIGHT:
        dx = [-1, 0, 0, 0, 1];
        dy = [0, -1, 0, 1, 0];
        for (let i = 0; i < 5; i++) {
          const row = (ctx.row + dy[i] + ctx.matrix.rows) % ctx.matrix.rows;
          const col = (ctx.col + dx[i] + ctx.matrix.cols) % ctx.matrix.cols;
          if (ctx.matrix.getPlayerId(row, col) !== ctx.playerId) {
            ctx.matrix.get(row, col).applyDamage(stats.KNIGHT.attack);
          }
        }
        break;
      case PieceType.ROOK:
        ctx.matrix.get(ctx.row, ctx.col).applyDefense(stats.ROOK.defense);
        break;
      case PieceType.PAWN:
        ctx.matrix.get(ctx.row, ctx.col).applyDamage(stats.PAWN.attack);
        break;
      default:
        break;
    }
  }
}
