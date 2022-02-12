export default class Vector2 {
  x: number;

  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(vector: Vector2) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }

  substract(vector: Vector2) {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }

  multiply(k: number) {
    this.x *= k;
    this.y *= k;
    return this;
  }

  copy() {
    return new Vector2(this.x, this.y);
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  makeUnit() {
    const length = this.length();
    this.x /= length;
    this.y /= length;
    return this;
  }

  mod(dimX: number, dimY: number) {
    if (this.x < 0) {
      this.x += (dimX * Math.abs(Math.ceil(this.x / dimX)));
    }
    if (this.y < 0) {
      this.y += (dimY * Math.abs(Math.ceil(this.y / dimY)));
    }
    this.x -= dimX * Math.floor(this.x / dimX);
    this.y -= dimY * Math.floor(this.y / dimY);
    return this;
  }
}
