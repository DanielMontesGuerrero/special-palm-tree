import Vector2 from './Vector2';
import Matrix from './Matrix';
import {PieceType} from './types';
import Piece from './Piece';
import KillReporter from './KillReporter';
import {Config} from '../config/config';

export type BallContext = {
  matrix: Matrix,
  playerId: number;
  killReporters: KillReporter[];
};

export type QueuedPiece = {
  type: PieceType;
  quantity: number;
};

export default class Ball {
  type: PieceType;

  position: Vector2;

  speed: number;

  direction: Vector2;

  static maxSpeed = Config.ball.maxSpeed;

  constructor(type: PieceType, position: Vector2, speed: number, direction: Vector2) {
    this.type = type;
    this.position = position;
    this.speed = speed;
    this.direction = direction.makeUnit();
  }

  move(dt: number) {
    this.position.add(this.direction.copy().multiply(this.speed * dt));
  }

  checkCollision(ctx: BallContext) {
    const j = Math.floor(this.position.x);
    const i = Math.floor(this.position.y);
    if (ctx.matrix.isOutOfBounds(i, j)) return false;
    switch (this.type) {
      case PieceType.QUEEN:
      case PieceType.KNIGHT:
      case PieceType.PAWN:
        return ctx.matrix.getPlayerId(i, j) !== ctx.playerId
          && ctx.matrix.get(i, j).health > 0;
      case PieceType.BISHOP:
        return ctx.matrix.getPlayerId(i, j) === ctx.playerId
          && ctx.matrix.get(i, j).health < 100;
      case PieceType.ROOK:
        return ctx.matrix.getPlayerId(i, j) === ctx.playerId
          && ctx.matrix.get(i, j).defense < 100;
      default:
        return false;
    }
  }

  // returns true on collision
  update(dt: number, ctx: BallContext) {
    this.move(dt);
    this.position.mod(ctx.matrix.cols, ctx.matrix.rows);
    if (this.checkCollision(ctx)) {
      Piece.applyEffect({
        row: Math.floor(this.position.y),
        col: Math.floor(this.position.x),
        matrix: ctx.matrix,
        playerId: ctx.playerId,
        pieceType: this.type,
        killReporters: ctx.killReporters,
      });
      return true;
    }
    return false;
  }
}
