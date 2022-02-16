import Board from '../src/models/Board';
import Piece from '../src/models/Piece';
import {PieceType} from '../src/models/types';

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
});
