import Vector2 from './Vector2';

export const DefaultVaules = {
  angle: 0,
  angularSpeed: Math.PI, // rad / s
};

export default class Arrow {
  angle: number;

  angularSpeed: number;

  static maxAngularSpeed = 2 * Math.PI;

  constructor(
    angle: number = DefaultVaules.angle,
    angularSpeed: number = DefaultVaules.angularSpeed,
  ) {
    this.angle = angle;
    this.angularSpeed = angularSpeed;
  }

  move(dt: number): void {
    this.angle += this.angularSpeed * dt;
    if (this.angle > 2 * Math.PI) {
      this.angle -= 2 * Math.PI;
    }
  }

  angleToVector2() {
    return new Vector2(Math.cos(this.angle), Math.sin(this.angle));
  }

  update(dt: number) {
    this.move(dt);
  }
}
