"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const Piece_1 = __importDefault(require("./Piece"));
const config_1 = require("../config/config");
class Ball {
    constructor(type, position, speed, direction) {
        this.type = type;
        this.position = position;
        this.speed = speed;
        this.direction = direction.makeUnit();
    }
    move(dt) {
        this.position.add(this.direction.copy().multiply(this.speed * dt));
    }
    checkCollision(ctx) {
        const j = Math.floor(this.position.x);
        const i = Math.floor(this.position.y);
        if (ctx.matrix.isOutOfBounds(i, j))
            return false;
        switch (this.type) {
            case types_1.PieceType.QUEEN:
            case types_1.PieceType.KNIGHT:
            case types_1.PieceType.PAWN:
                return ctx.matrix.getPlayerId(i, j) !== ctx.playerId
                    && ctx.matrix.get(i, j).health > 0;
            case types_1.PieceType.BISHOP:
                return ctx.matrix.getPlayerId(i, j) === ctx.playerId
                    && ctx.matrix.get(i, j).health < 100;
            case types_1.PieceType.ROOK:
                return ctx.matrix.getPlayerId(i, j) === ctx.playerId
                    && ctx.matrix.get(i, j).defense < 100;
            default:
                return false;
        }
    }
    // returns true on collision
    update(dt, ctx) {
        this.move(dt);
        this.position.mod(ctx.matrix.cols, ctx.matrix.rows);
        if (this.checkCollision(ctx)) {
            Piece_1.default.applyEffect({
                row: Math.floor(this.position.y),
                col: Math.floor(this.position.x),
                matrix: ctx.matrix,
                playerId: ctx.playerId,
                pieceType: this.type,
                killReporters: ctx.killReporters,
            });
            return true;
        }
        return false;
    }
}
exports.default = Ball;
Ball.maxSpeed = config_1.Config.ball.maxSpeed;
