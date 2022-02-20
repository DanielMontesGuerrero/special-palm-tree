import Ball from '../src/models/Ball';
import Board from '../src/models/Board';
import Piece from '../src/models/Piece';
import {PieceType} from '../src/models/types';
import Vector2 from '../src/models/Vector2';

describe('Board', () => {
  test('releaseBalls', () => {
    const board = new Board(10, 10);
    let lastNumBalls = 30;
    let lastTimestamp = 0;
    board.addBalls(1, new Piece(PieceType.PAWN, lastNumBalls));
    while (board.ballsToRelease[1].length > 0) {
      board.releaseBalls(1);
      if (board.ballsToRelease[1].length > 0) {
        if (board.ballsToRelease[1][0].quantity !== lastNumBalls) {
          const currentTimestamp = Date.now();
          expect(currentTimestamp - lastTimestamp).toBeGreaterThanOrEqual(Board.ballReleaseDelay);
          lastTimestamp = currentTimestamp;
          lastNumBalls = board.ballsToRelease[1][0].quantity;
        }
      }
    }
  });

  test('update', () => {
    const board = new Board(12, 12);
    board.balls[0] = [
      new Ball(PieceType.QUEEN, new Vector2(11, 11), 0.1, new Vector2(1, 1)),
      new Ball(PieceType.QUEEN, new Vector2(0, 0), 0.1, new Vector2(1, 1)),
    ];
    board.lastUpdate = (Date.now() - 500) / 1000;
    board.update();
    expect(board.balls[0].length).toBe(1);
  });
});
