import Ball from '../src/models/Ball';
import Board from '../src/models/Board';
import KillReporter from '../src/models/KillReporter';
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
    const killReporters = [];
    board.balls[0] = [
      new Ball(PieceType.QUEEN, new Vector2(11, 11), 0.1, new Vector2(1, 1)),
      new Ball(PieceType.QUEEN, new Vector2(0, 0), 0.1, new Vector2(1, 1)),
    ];
    for (let i = 0; i < 4; i++) killReporters.push(new KillReporter());
    board.lastUpdate = (Date.now() - 500) / 1000;
    board.update(killReporters);
    expect(board.balls[0].length).toBe(1);
  });

  test('getAlivePlayers', () => {
    const board = new Board(2, 2);
    const killReporter = new KillReporter();
    expect(board.getAlivePlayers()).toStrictEqual([0, 1, 2, 3]);
    board.matrix.get(0, 1).health = 0;
    board.matrix.reportDeadCell(0, 1, killReporter);
    expect(board.getAlivePlayers()).toStrictEqual([0, 2, 3]);
    board.matrix.get(0, 0).health = 0;
    board.matrix.get(1, 0).health = 0;
    board.matrix.reportDeadCell(0, 0, killReporter);
    board.matrix.reportDeadCell(1, 0, killReporter);
    expect(board.getAlivePlayers()).toStrictEqual([3]);
    board.matrix.get(1, 1).health = 0;
    board.matrix.reportDeadCell(1, 1, killReporter);
    expect(board.getAlivePlayers()).toStrictEqual([]);
  });
});
