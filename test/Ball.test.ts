import Ball from '../src/models/Ball';
import Matrix from '../src/models/Matrix';
import {PieceType} from '../src/models/types';
import Vector2 from '../src/models/Vector2';

describe('Ball', () => {
  test('move', () => {
    let ball = new Ball(PieceType.KING, new Vector2(5, 5), 1, new Vector2(0, 1));
    ball.move(1);
    expect(ball.position).toEqual(new Vector2(5, 6));
    expect(ball.direction).toEqual(new Vector2(0, 1));
    expect(ball.speed).toEqual(1);

    ball = new Ball(PieceType.KING, new Vector2(0, 0), 1, new Vector2(0.5, -0.5));
    ball.move(5.5);
    expect(ball.position.length()).toBeCloseTo(5.5);
    expect(ball.position.x).toBeCloseTo(3.88908);
    expect(ball.position.y).toBeCloseTo(-3.88908);
  });

  test('checkCollision', () => {
    const ball = new Ball(PieceType.KING, new Vector2(3.5, 9.9999), 1, new Vector2(1, 1));
    const matrix = new Matrix(10, 10);
    expect(ball.checkCollision(matrix)).toBe(true);

    matrix.get(3, 9).health = 0;
    expect(ball.checkCollision(matrix)).toBe(false);

    ball.position = new Vector2(-7, -12);
    expect(ball.checkCollision(matrix)).toBe(false);
  });
});
