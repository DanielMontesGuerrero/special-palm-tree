import Arrow from './Arrow';
import Ball, {QueuedPiece} from './Ball';
import Matrix from './Matrix';
import Piece from './Piece';

export const DefaultVaules = {
  defaultSpeed: 1,
};

export default class Board {
  lastUpdate: number;

  matrix: Matrix;

  balls: Ball[][];

  ballSpeeds: number[];

  arrows: Arrow[];

  lastBallReleasedAt: number[];

  ballsToRelease: QueuedPiece[][];

  static ballReleaseDelay = 250;

  constructor(height: number, width: number) {
    this.matrix = new Matrix(height, width);
    this.lastUpdate = 0;
    this.balls = [[], [], [], []];
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
    this.lastBallReleasedAt = [0, 0, 0, 0];
    this.ballsToRelease = [[], [], [], []];
  }

  addBalls(playerId: number, piece: Piece) {
    this.ballsToRelease[playerId].push({type: piece.type, quantity: piece.quantity});
    piece.clear();
  }

  releaseBalls(playerId: number) {
    if (this.ballsToRelease[playerId].length > 0
        && (Date.now() - this.lastBallReleasedAt[playerId]) >= Board.ballReleaseDelay) {
      this.balls[playerId].push(new Ball(
        this.ballsToRelease[playerId][0].type,
        this.matrix.getPlayerCoords(playerId),
        this.ballSpeeds[playerId],
        this.arrows[playerId].angleToVector2(),
      ));
      this.ballsToRelease[playerId][0].quantity -= 1;
      if (this.ballsToRelease[playerId][0].quantity === 0) {
        this.ballsToRelease[playerId].shift();
      }
      this.lastBallReleasedAt[playerId] = Date.now();
    }
  }

  update() {
    const dt = this.lastUpdate === 0 ? 0 : Date.now() - this.lastUpdate;
    this.lastUpdate = Date.now();
    for (let playerId = 0; playerId < 4; playerId++) {
      this.arrows[playerId].update(dt);
      this.balls[playerId].forEach((ball) => {
        ball.update(dt, {matrix: this.matrix, playerId});
      });
      this.releaseBalls(playerId);
    }
  }
}
