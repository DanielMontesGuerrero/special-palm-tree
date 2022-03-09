import Vector2 from '../src/game/Vector2';

describe('Vector2', () => {
  test('add', () => {
    const vector = new Vector2(0, 0);
    vector.add(new Vector2(8, 9.5));
    expect(vector).toEqual(new Vector2(8, 9.5));

    vector.add(new Vector2(-5.5, -3));
    expect(vector).toEqual(new Vector2(2.5, 6.5));
  });

  test('substract', () => {
    const vector = new Vector2(0, 0);
    vector.substract(new Vector2(8, 9.5));
    expect(vector).toEqual(new Vector2(-8, -9.5));

    vector.substract(new Vector2(-5.5, -3));
    expect(vector).toEqual(new Vector2(-2.5, -6.5));
  });

  test('multiply', () => {
    const vector = new Vector2(1, 1);
    vector.multiply(5);
    expect(vector).toEqual(new Vector2(5, 5));

    vector.multiply(1.5);
    expect(vector).toEqual(new Vector2(7.5, 7.5));
  });

  test('copy', () => {
    const vector = new Vector2(3.7, -0.5);
    expect(vector.copy()).toEqual(vector);
  });

  test('length', () => {
    const vector = new Vector2(3, 4);
    expect(vector.length()).toBe(5);
  });

  test('makeUnit', () => {
    const vector = new Vector2(4, 7);
    vector.makeUnit();
    expect(vector.length()).toBe(1);
  });

  test('mod', () => {
    let vector = new Vector2(-14, 478);
    vector.mod(3, 7);
    expect(vector).toBeVector2(new Vector2(1, 2));

    vector = new Vector2(5.95, -10.99);
    vector.mod(4, 5);
    expect(vector).toBeVector2(new Vector2(1.95, 4.01));
  });
});
