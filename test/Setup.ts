/* eslint-disable @typescript-eslint/no-namespace */
import Vector2 from '../src/models/Vector2';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeVector2: (expected: Vector2) => CustomMatcherResult;
    }
  }
}

expect.extend({
  toBeVector2(received: Vector2, expected: Vector2, precision = 0.005) {
    const passX = Math.abs(received.x - expected.x) < precision;
    const passY = Math.abs(received.y - expected.y) < precision;
    if (!passX) {
      return {
        message: () => `expected ${received.x} to be within range (${expected.x - precision}, `
          + `${expected.x + precision})`,
        pass: false,
      };
    }
    if (!passY) {
      return {
        message: () => `expected ${received.y} to be within range (${expected.y - precision}, `
          + `${expected.x + precision})`,
        pass: false,
      };
    }
    return {
      message: () => `expected ${received.x} not to be within range (${expected.x - precision}, `
        + `${expected.x + precision}) and ${received.y} not to be within range `
        + `(${expected.y - precision}, ${expected.y + precision})`,
      pass: true,
    };
  },
});
