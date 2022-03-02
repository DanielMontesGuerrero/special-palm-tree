"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const Arrow_1 = __importDefault(require("./Arrow"));
const Ball_1 = __importDefault(require("./Ball"));
const Matrix_1 = __importDefault(require("./Matrix"));
class Board {
    constructor(height, width) {
        this.matrix = new Matrix_1.default(height, width);
        this.lastUpdate = 0;
        this.balls = [[], [], [], []];
        this.ballSpeeds = [
            config_1.Config.ball.defaultSpeed,
            config_1.Config.ball.defaultSpeed,
            config_1.Config.ball.defaultSpeed,
            config_1.Config.ball.defaultSpeed,
        ];
        this.arrows = [
            new Arrow_1.default(),
            new Arrow_1.default(),
            new Arrow_1.default(),
            new Arrow_1.default(),
        ];
        this.lastBallReleasedAt = [0, 0, 0, 0];
        this.ballsToRelease = [[], [], [], []];
    }
    addBalls(playerId, piece) {
        this.ballsToRelease[playerId].push({ type: piece.type, quantity: piece.quantity });
        piece.clear();
    }
    releaseBalls(playerId) {
        if (this.ballsToRelease[playerId].length > 0
            && (Date.now() - this.lastBallReleasedAt[playerId]) >= Board.ballReleaseDelay) {
            this.balls[playerId].push(new Ball_1.default(this.ballsToRelease[playerId][0].type, this.matrix.getPlayerCoords(playerId), this.ballSpeeds[playerId], this.arrows[playerId].angleToVector2()));
            this.ballsToRelease[playerId][0].quantity -= 1;
            if (this.ballsToRelease[playerId][0].quantity === 0) {
                this.ballsToRelease[playerId].shift();
            }
            this.lastBallReleasedAt[playerId] = Date.now();
        }
    }
    update(killReporters) {
        const dt = this.lastUpdate === 0 ? 0 : (Date.now() / 1000) - this.lastUpdate;
        this.lastUpdate = Date.now() / 1000;
        for (let playerId = 0; playerId < 4; playerId++) {
            this.arrows[playerId].update(dt);
            this.balls[playerId] = this.balls[playerId].filter((ball) => !ball.update(dt, { matrix: this.matrix, playerId, killReporters }));
            this.releaseBalls(playerId);
        }
    }
    getAlivePlayers() {
        const playerIds = [];
        for (let id = 0; id < 4; id++) {
            if (this.matrix.getCountOfAliveCells(id) > 0) {
                playerIds.push(id);
            }
        }
        return playerIds;
    }
}
exports.default = Board;
Board.ballReleaseDelay = config_1.Config.ball.releaseDelay;
