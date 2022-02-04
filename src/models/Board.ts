import Ball from './Ball';
import Matrix from './Matrix';

export default class Board {
  lastUpdate: number;

  matrix: Matrix;

  balls: Ball[];

  constructor(height: number, width: number) {
    this.matrix = new Matrix(height, width);
    this.lastUpdate = 0;
    this.balls = [];
  }
}
