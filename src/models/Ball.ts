import Vector2 from './Vector2';
import Matrix from './Matrix';
import {PieceType} from './types';

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

  checkCollision(matrix: Matrix) {
    const i = Math.floor(this.position.x);
    const j = Math.floor(this.position.y);
    if (matrix.isOutOfBounds(i, j)) return false;
    return matrix.get(i, j).isAlive();
  }

  // TODO: implementar metodo update y verificar que la deteccion de colisiones sea acorde
  // al tipo de pieza, ejemplo: los peones colisionan con piezas enemigas, los alfiles con
  // piezas propias
  // TODO: modular movimiento de la bola, ejemplo: si la bola sale por el lado izquierdo de
  // la matriz, tiene que reaparecer en el lado derecho
}
