export class Cell {
	health : number;
	defense : number;
	constructor(cell : Cell) {
		this.health = cell.health;
		this.defense = cell.defense;
	}
}