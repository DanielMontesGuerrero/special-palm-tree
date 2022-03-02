"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const Vector2_1 = __importDefault(require("./Vector2"));
class Arrow {
    constructor(angle = config_1.Config.arrow.angle, angularSpeed = config_1.Config.arrow.angularSpeed) {
        this.angle = angle;
        this.angularSpeed = angularSpeed;
    }
    move(dt) {
        this.angle += this.angularSpeed * dt;
        if (this.angle > 2 * Math.PI) {
            this.angle -= 2 * Math.PI;
        }
    }
    angleToVector2() {
        return new Vector2_1.default(Math.cos(this.angle), Math.sin(this.angle));
    }
    update(dt) {
        this.move(dt);
    }
}
exports.default = Arrow;
Arrow.maxAngularSpeed = config_1.Config.arrow.maxAngularSpeed;
