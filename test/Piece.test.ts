import KillReporter from '../src/models/KillReporter';
import Matrix from '../src/models/Matrix';
import Piece, {stats} from '../src/models/Piece';
import {PieceType} from '../src/models/types';

describe('Piece', () => {
  test('applyEffect-QUEEN', () => {
    const matrix = new Matrix(10, 10);
    const killReporters = [
      new KillReporter(),
      new KillReporter(),
      new KillReporter(),
      new KillReporter(),
    ];
    const ctx = {
      row: 2,
      col: 0,
      matrix,
      playerId: 1,
      pieceType: PieceType.QUEEN,
      killReporters,
    };
    // dead cell
    matrix.get(1, 9).health = 0;
    // cell with damage
    matrix.get(2, 9).applyDamage(stats.QUEEN.attack);
    const oldHealth = matrix.get(2, 9).health;
    Piece.applyEffect(ctx);
    const enemyCellCoords = [
      {row: 1, col: 0},
      {row: 2, col: 0},
      {row: 3, col: 0},
      {row: 1, col: 1},
      {row: 2, col: 1},
      {row: 3, col: 1},
    ];
    for (let i = 0; i < enemyCellCoords.length; i++) {
      // check damage in enemy cells
      expect(matrix.get(enemyCellCoords[i].row, enemyCellCoords[i].col).health).toBeLessThan(100);
    }

    // check that dead cell remains dead
    expect(matrix.get(1, 9).defense).toBe(10);
    expect(matrix.get(1, 9).health).toBe(0);

    // check increase in defense in non enemy cells
    expect(matrix.get(2, 9).defense).toBeGreaterThan(10);
    // check that cell gains health
    expect(matrix.get(2, 9).health).toBeGreaterThan(oldHealth);

    expect(matrix.get(3, 9).defense).toBeGreaterThan(10);
    // check that cell doesn't  overflow health limit
    expect(matrix.get(3, 9).health).toBe(100);
  });

  test('applyEffect-BISHOP', () => {
    const matrix = new Matrix(10, 10);
    const killReporters = [
      new KillReporter(),
      new KillReporter(),
      new KillReporter(),
      new KillReporter(),
    ];
    const ctx = {
      row: 9,
      col: 0,
      matrix,
      playerId: 2,
      pieceType: PieceType.BISHOP,
      killReporters,
    };
    matrix.get(9, 0).health = 10;
    Piece.applyEffect(ctx);
    expect(matrix.get(9, 0).health).toBe(10 + stats.BISHOP.health);
  });

  test('applyEffect-KNIGHT', () => {
    const matrix = new Matrix(10, 10);
    const killReporters = [
      new KillReporter(),
      new KillReporter(),
      new KillReporter(),
      new KillReporter(),
    ];
    const ctx = {
      row: 9,
      col: 9,
      matrix,
      playerId: 3,
      pieceType: PieceType.KNIGHT,
      killReporters,
    };
    // dead cell
    matrix.get(0, 9).health = 0;
    // cell with damage
    matrix.get(9, 0).applyDamage(stats.KNIGHT.attack);
    const oldHealth = matrix.get(9, 0).health;
    Piece.applyEffect(ctx);
    const nonEnemyCellCoords = [
      {row: 9, col: 9},
      {row: 9, col: 8},
      {row: 8, col: 9},
    ];
    for (let i = 0; i < nonEnemyCellCoords.length; i++) {
      // check no damage in non enemy cells
      expect(matrix.get(nonEnemyCellCoords[i].row, nonEnemyCellCoords[i].col).health).toBe(100);
    }

    // check that dead cell remains dead
    expect(matrix.get(0, 9).defense).toBe(10);
    expect(matrix.get(0, 9).health).toBe(0);

    // check increase in defense in non enemy cells
    expect(matrix.get(9, 0).health).toBeLessThan(oldHealth);
  });

  test('applyEffect-ROOK', () => {
    const matrix = new Matrix(10, 10);
    const killReporters = [
      new KillReporter(),
      new KillReporter(),
      new KillReporter(),
      new KillReporter(),
    ];
    const ctx = {
      row: 9,
      col: 0,
      matrix,
      playerId: 2,
      pieceType: PieceType.ROOK,
      killReporters,
    };
    Piece.applyEffect(ctx);
    expect(matrix.get(9, 0).defense).toBe(10 + stats.ROOK.defense);

    ctx.row = 7;
    ctx.col = 2;
    matrix.get(7, 2).defense = 90;
    Piece.applyEffect(ctx);
    expect(matrix.get(7, 2).defense).toBe(100);
  });

  test('applyEffect-PAWN', () => {
    const matrix = new Matrix(10, 10);
    const killReporters = [
      new KillReporter(),
      new KillReporter(),
      new KillReporter(),
      new KillReporter(),
    ];
    const ctx = {
      row: 0,
      col: 0,
      matrix,
      playerId: 0,
      pieceType: PieceType.PAWN,
      killReporters,
    };
    Piece.applyEffect(ctx);
    expect(matrix.get(0, 0).health).toBeLessThan(100);

    ctx.row = 1;
    ctx.col = 1;
    matrix.get(1, 1).health = 0;
    Piece.applyEffect(ctx);
    expect(matrix.get(1, 1).health).toBe(0);
  });
});
