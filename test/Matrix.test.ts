import Matrix from '../src/models/Matrix';

describe('Matrix', () => {
  test('playerId', () => {
    const matrix = new Matrix(10, 10);
    expect(matrix.getPlayerId(0, 0)).toBe(0);
    expect(matrix.getPlayerId(4, 4)).toBe(0);

    expect(matrix.getPlayerId(0, 5)).toBe(1);
    expect(matrix.getPlayerId(2, 9)).toBe(1);

    expect(matrix.getPlayerId(9, 4)).toBe(2);
    expect(matrix.getPlayerId(8, 3)).toBe(2);

    expect(matrix.getPlayerId(9, 9)).toBe(3);
    expect(matrix.getPlayerId(5, 5)).toBe(3);
  });
});
