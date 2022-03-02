"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouletteSetsConfig = exports.Config = void 0;
const types_1 = require("../models/types");
exports.Config = {
    rows: 42,
    cols: 42,
    timeLimit: 180000,
    numPlayers: 4,
    arrow: {
        angle: 0,
        angularSpeed: Math.PI,
        maxAngularSpeed: 2 * Math.PI,
    },
    roulette: {
        rouletteDelay: 3000,
    },
    ball: {
        maxSpeed: 2,
        defaultSpeed: 1,
        releaseDelay: 250,
    },
    cell: {
        health: 100,
        defense: 10,
    },
    pieceStats: {
        QUEEN: {
            attack: 80,
            defense: 10,
            health: 10,
        },
        KNIGHT: {
            attack: 40,
            defense: 0,
            health: 0,
        },
        BISHOP: {
            attack: 0,
            defense: 0,
            health: 60,
        },
        ROOK: {
            attack: 0,
            defense: 80,
            health: 0,
        },
        PAWN: {
            attack: 20,
            defense: 0,
            health: 0,
        },
    },
    score: {
        killValue: 10000,
        pieceValue: {
            QUEEN: 3,
            BISHOP: 2,
            KNIGHT: 2,
            ROOK: 2,
            PAWN: 1,
        },
    },
};
exports.RouletteSetsConfig = {
    DEFAULT: {
        piecesProbabilities: [
            { type: types_1.PieceType.QUEEN, probability: 0.1 },
            { type: types_1.PieceType.BISHOP, probability: 0.2 },
            { type: types_1.PieceType.KNIGHT, probability: 0.2 },
            { type: types_1.PieceType.ROOK, probability: 0.2 },
            { type: types_1.PieceType.PAWN, probability: 0.3 },
        ],
        increasedAngularSpeed: 0.2,
        increasedSpeed: 0.2,
        increasedQuantity: 100,
    },
};
