export class Arrow {
	angle : number;
	angularSpeed : number;

	constructor(arrow : Arrow) {
		this.angle = arrow.angle;
		this.angularSpeed = arrow.angularSpeed;
	}
	update(dt : number) : void {
		this.angle = this.angularSpeed * dt;
	}
};