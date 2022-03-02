import {Config} from '../config/config';
import Vector2 from './Vector2';

export default class Arrow {
  angle: number;

  angularSpeed: number;

  static maxAngularSpeed = Config.arrow.maxAngularSpeed;

  constructor(
    angle: number = Config.arrow.angle,
    angularSpeed: number = Config.arrow.angularSpeed,
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
