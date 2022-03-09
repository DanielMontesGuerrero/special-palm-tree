import {Config} from '../src/config/config';
import Board from '../src/game/Board';
import Game from '../src/game/Game';
import Matrix from '../src/game/Matrix';
import MessageManager from '../src/game/MessageManager';
import Player from '../src/game/Player';
import {GamePhase, PieceType} from '../src/game/types';

describe('Game Config', () => {
  test('Board dimensions', () => {
    expect(Config.rows % 4).toBe(2);
    expect(Config.cols % 4).toBe(2);
  });

  test('Board', () => {
    const board = new Board(10, 10);
    expect(board.balls.length).toBe(4);
    expect(board.ballSpeeds.length).toBe(4);
    expect(board.arrows.length).toBe(4);
    expect(board.lastBallReleasedAt.length).toBe(4);
    expect(board.ballsToRelease.length).toBe(4);
  });

  test('Game', () => {
    let game = new Game([]);
    expect(game.players.length).toBe(4);
    expect(game.phase).toBe(GamePhase.IDLE);

    game = new Game(['Player 1', 'Player 2']);
    expect(game.players.length).toBe(4);
    expect(game.phase).toBe(GamePhase.IDLE);
  });

  test('Matrix', () => {
    const matrix = new Matrix(10, 10);
    expect(matrix.countOfAliveCells.length).toBe(4);
  });

  test('MessageManager', () => {
    const messageManager = new MessageManager(0);
    expect(messageManager.notifiedDeadPlayer.length).toBe(4);
  });

  test('Player', () => {
    const player = new Player('Player 1', 1);
    expect(player.hand.length).toBe(6);
    expect(player.activePiece.type).toBe(PieceType.PAWN);
  });
});
