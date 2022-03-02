"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouletteSets = void 0;
const Ball_1 = __importDefault(require("./Ball"));
const Arrow_1 = __importDefault(require("./Arrow"));
const config_1 = require("../config/config");
class RouletteOption {
    constructor(name, probability, action) {
        this.name = name;
        this.probability = probability;
        this.action = action;
    }
}
exports.default = RouletteOption;
exports.RouletteSets = {
    DEFAULT: [
        new RouletteOption('Take piece', 0.2, (ctx) => {
            let currProbability = 0;
            let selectedPiece = 0;
            const randomProb = Math.random();
            for (let i = 0; i < config_1.RouletteSetsConfig.DEFAULT.piecesProbabilities.length; i++) {
                if (currProbability <= randomProb && randomProb < (currProbability
                    + config_1.RouletteSetsConfig.DEFAULT.piecesProbabilities[i].probability)) {
                    selectedPiece = config_1.RouletteSetsConfig.DEFAULT.piecesProbabilities[i].type;
                    break;
                }
                currProbability += config_1.RouletteSetsConfig.DEFAULT.piecesProbabilities[i].probability;
            }
            if (ctx.hand[selectedPiece].quantity > 0) {
                ctx.hand[selectedPiece].quantity += config_1.RouletteSetsConfig.DEFAULT.increasedQuantity;
            }
            else {
                ctx.hand[selectedPiece].quantity = 1;
            }
        }),
        new RouletteOption('x2', 0.1, (ctx) => {
            ctx.activePiece.quantity *= 2;
        }),
        new RouletteOption('+10', 0.4, (ctx) => {
            ctx.activePiece.quantity += 10;
        }),
        new RouletteOption('-10', 0.1, (ctx) => {
            ctx.activePiece.quantity = Math.max(0, ctx.activePiece.quantity - 10);
        }),
        new RouletteOption('Increase arrow speed', 0.1, (ctx) => {
            ctx.arrow.angularSpeed = Math.min(Arrow_1.default.maxAngularSpeed, ctx.arrow.angularSpeed + config_1.RouletteSetsConfig.DEFAULT.increasedAngularSpeed);
        }),
        new RouletteOption('Increase balls speed', 0.1, (ctx) => {
            ctx.board.ballSpeeds[ctx.playerId] = Math.min(Ball_1.default.maxSpeed, ctx.board.ballSpeeds[ctx.playerId] + config_1.RouletteSetsConfig.DEFAULT.increasedSpeed);
        }),
    ],
};
