import {PieceType} from './types';
import Matrix from './Matrix';
import KillReporter from './KillReporter';
import {Config} from '../config/config';

export interface CollisionContext {
  row: number;
  col: number;
  matrix: Matrix;
  playerId: number;
  pieceType: PieceType;
  killReporters: KillReporter[];
}

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
              ctx.matrix.get(row, col).applyDamage(Config.pieceStats.QUEEN.attack);
              ctx.matrix.reportDeadCell(row, col, ctx.killReporters[ctx.playerId]);
            } else {
              ctx.matrix.get(row, col).applyDefense(Config.pieceStats.QUEEN.defense);
              ctx.matrix.get(row, col).applyHealth(Config.pieceStats.QUEEN.health);
            }
          }
        }
        break;
      case PieceType.BISHOP:
        ctx.matrix.get(ctx.row, ctx.col).applyHealth(Config.pieceStats.BISHOP.health);
        break;
      case PieceType.KNIGHT:
        dx = [-1, 0, 0, 0, 1];
        dy = [0, -1, 0, 1, 0];
        for (let i = 0; i < 5; i++) {
          const row = (ctx.row + dy[i] + ctx.matrix.rows) % ctx.matrix.rows;
          const col = (ctx.col + dx[i] + ctx.matrix.cols) % ctx.matrix.cols;
          if (ctx.matrix.getPlayerId(row, col) !== ctx.playerId) {
            ctx.matrix.get(row, col).applyDamage(Config.pieceStats.KNIGHT.attack);
            ctx.matrix.reportDeadCell(row, col, ctx.killReporters[ctx.playerId]);
          }
        }
        break;
      case PieceType.ROOK:
        ctx.matrix.get(ctx.row, ctx.col).applyDefense(Config.pieceStats.ROOK.defense);
        break;
      case PieceType.PAWN:
        ctx.matrix.get(ctx.row, ctx.col).applyDamage(Config.pieceStats.PAWN.attack);
        ctx.matrix.reportDeadCell(ctx.row, ctx.col, ctx.killReporters[ctx.playerId]);
        break;
      default:
        break;
    }
  }
}
