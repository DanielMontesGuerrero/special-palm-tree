import {Ball} from './Ball';
import {Cell} from './Cell'

export class Board {
	width : number;
	height : number;
	lastUpdate : number;
	cells : Cell[][];
	balls : Ball[];

	constructor(board : Board) {
		this.width = board.width;
		this.height = board.height;
		this.cells = board.cells;
		this.lastUpdate = board.lastUpdate;
		this.balls = board.balls;
	}

	getCell(i : number, j : number) : Cell {
		return this.cells[i][j];
	}

	update(dt : number) {

	}
};