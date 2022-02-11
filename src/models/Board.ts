import Arrow from './Arrow';
import Ball from './Ball';
import Matrix from './Matrix';

export const DefaultVaules = {
  defaultSpeed: 1,
};

export default class Board {
  lastUpdate: number;

  matrix: Matrix;

  balls: Ball[];

  ballSpeeds: number[];

  arrows: Arrow[];

  constructor(height: number, width: number) {
    this.matrix = new Matrix(height, width);
    this.lastUpdate = 0;
    this.balls = [];
    this.ballSpeeds = [
      DefaultVaules.defaultSpeed,
      DefaultVaules.defaultSpeed,
      DefaultVaules.defaultSpeed,
      DefaultVaules.defaultSpeed,
    ];
    this.arrows = [
      new Arrow(),
      new Arrow(),
      new Arrow(),
      new Arrow(),
    ];
  }
}
