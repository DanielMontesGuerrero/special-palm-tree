import Arrow from '../src/game/Arrow';
import Vector2 from '../src/game/Vector2';

describe('Arrow', () => {
  test('move', () => {
    const arrow = new Arrow(0, Math.PI);
    arrow.move(1);
    expect(arrow.angleToVector2()).toBeVector2(new Vector2(-1, 0));

    arrow.move(1.25);
    expect(arrow.angleToVector2()).toBeVector2(
      new Vector2(Math.cos(Math.PI / 4), Math.sin(Math.PI / 4)),
    );
  });
});
