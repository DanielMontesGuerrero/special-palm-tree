import Cell from './Cell';
import Vector2 from './Vector2';

export default class Matrix {
  rows: number;

  cols: number;

  matrix: Cell[][];

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
    this.matrix = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push(new Cell());
      }
      this.matrix.push(row);
    }
  }

  isOutOfBounds(i: number, j: number) {
    return i >= this.rows || i < 0 || j >= this.cols || j < 0;
  }

  get(i: number, j: number) {
    return this.matrix[i][j];
  }

  /*
   * Player id depends on the quadrant
   * -----
   * |0|1|
   * -----
   * |2|3|
   * -----
   */
  getPlayerId(i: number, j: number) {
    const rowSide = i >= this.rows / 2;
    const colSide = j >= this.cols / 2;
    return 1 * (colSide ? 1 : 0) + 2 * (rowSide ? 1 : 0);
  }

  getPlayerCoords(playerId: number) {
    switch (playerId) {
      case 0: return new Vector2(this.cols / 4, this.rows / 4);
      case 1: return new Vector2((3 * this.cols) / 4, this.rows / 4);
      case 2: return new Vector2(this.cols / 4, (3 * this.rows) / 4);
      case 3: return new Vector2((3 * this.cols) / 4, (3 * this.rows) / 4);
      default: return new Vector2(0, 0);
    }
  }
}
