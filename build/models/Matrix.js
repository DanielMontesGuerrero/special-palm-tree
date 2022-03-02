"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = __importDefault(require("./Cell"));
const Vector2_1 = __importDefault(require("./Vector2"));
class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.matrix = [];
        this.isMarkedAsDeadCell = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            const isDeadCellRow = [];
            for (let j = 0; j < cols; j++) {
                row.push(new Cell_1.default());
                isDeadCellRow.push(false);
            }
            this.matrix.push(row);
            this.isMarkedAsDeadCell.push(isDeadCellRow);
        }
        const cellsPerPlayer = (rows / 2) * (cols / 2);
        this.countOfAliveCells = [cellsPerPlayer, cellsPerPlayer, cellsPerPlayer, cellsPerPlayer];
    }
    reportDeadCell(i, j, killReporter) {
        if (this.matrix[i][j].health <= 0 && !this.isMarkedAsDeadCell[i][j]) {
            killReporter.addKill();
            this.countOfAliveCells[this.getPlayerId(i, j)] -= 1;
            this.isMarkedAsDeadCell[i][j] = true;
        }
    }
    getCountOfAliveCells(playerId) {
        return this.countOfAliveCells[playerId];
    }
    getTotalCountOfCells() {
        return (this.rows / 2) * (this.cols / 2);
    }
    isOutOfBounds(i, j) {
        return i >= this.rows || i < 0 || j >= this.cols || j < 0;
    }
    get(i, j) {
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
    getPlayerId(i, j) {
        const rowSide = i >= this.rows / 2;
        const colSide = j >= this.cols / 2;
        return 1 * (colSide ? 1 : 0) + 2 * (rowSide ? 1 : 0);
    }
    getPlayerCoords(playerId) {
        switch (playerId) {
            case 0: return new Vector2_1.default(this.cols / 4, this.rows / 4);
            case 1: return new Vector2_1.default((3 * this.cols) / 4, this.rows / 4);
            case 2: return new Vector2_1.default(this.cols / 4, (3 * this.rows) / 4);
            case 3: return new Vector2_1.default((3 * this.cols) / 4, (3 * this.rows) / 4);
            default: return new Vector2_1.default(0, 0);
        }
    }
}
exports.default = Matrix;
