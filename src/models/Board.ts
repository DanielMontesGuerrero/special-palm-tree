import Ball from './Ball';
import Matrix from './Matrix';

export default class Board {
  lastUpdate: number;

  matrix: Matrix;

  balls: Ball[];

  constructor(board: Board) {
    this.matrix = board.matrix;
    this.lastUpdate = board.lastUpdate;
    this.balls = board.balls;
  }
}
