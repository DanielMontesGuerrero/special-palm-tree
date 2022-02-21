import Player from '../src/models/Player';
import {ScoreType} from '../src/models/types';

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
});
