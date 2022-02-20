import Player from '../src/models/Player';
import {PieceType} from '../src/models/types';

describe('Player', () => {
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
