import {PieceType} from './Piece';
import Vector2 from './Vector2';

export default class Ball {
  type: PieceType;

  position: Vector2;

  speed: number;

  direction: Vector2;

  constructor(type: PieceType, position: Vector2, speed: number, direction: Vector2) {
    this.type = type;
    this.position = position;
    this.speed = speed;
    this.direction = direction.makeUnit();
  }

  move(dt: number) {
    this.position.add(this.direction.copy().multiply(this.speed * dt));
  }
}
