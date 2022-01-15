import {Vector2} from "./Vector2.js";

export class Ball {
	type : PieceType;
	position : Vector2;
	speed : number;
	direction : Vector2;
	constructor(ball : Ball) {
		this.type = ball.type;
		this.position = ball.position;
		this.speed = ball.speed;
		this.direction = ball.direction;
	}
	move(dx : number) {
		this.position.x = this.position.x + this.direction.x*this.speed*dx;
		this.position.y = this.position.y + this.direction.y*this.speed*dx;
	}
};