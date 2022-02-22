import Player from '../src/models/Player';
import {ScoreType, PieceType} from '../src/models/types';

describe('Player', () => {
  test('updateScore', () => {
    const player = new Player('Player 1', 1);
    player.killReporter.addKill();
    player.updateScore(ScoreType.KILL);
    expect(player.score).toBeGreaterThan(0);
    expect(player.killReporter.unreportedKills).toBe(0);
    expect(player.killReporter.totalKills).toBe(1);

    player.score = 0;
    player.updateScore(ScoreType.PIECE_RELEASED, player.activePiece);
    expect(player.score).toBeGreaterThan(0);
  });

  test('removePiece', () => {
    const player = new Player('Player 1', 1);
    player.hand[PieceType.QUEEN].quantity = 50;
    player.changeActivePiece(PieceType.QUEEN);
    player.removePiece(PieceType.QUEEN);
    expect(player.hand[PieceType.QUEEN].quantity).toBe(0);
    expect(player.hand[PieceType.QUEEN].isActive).toBe(false);
    expect(player.activePiece.type).toBe(PieceType.PAWN);
    expect(player.activePiece.quantity).toBe(1);

    player.removePiece(PieceType.QUEEN);
    expect(player.activePiece.type).toBe(PieceType.PAWN);
    expect(player.activePiece.quantity).toBe(1);
  });

  test('changeActivePiece', () => {
    const player = new Player('Player 1', 1);
    player.changeActivePiece(PieceType.QUEEN);
    expect(player.activePiece.type).toBe(PieceType.QUEEN);
  });
});
