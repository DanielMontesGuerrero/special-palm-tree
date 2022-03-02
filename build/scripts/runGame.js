"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = __importDefault(require("../models/Game"));
const print_1 = require("../utils/print");
const readline_1 = __importDefault(require("readline"));
const game = new Game_1.default([]);
game.start();
console.clear();
game.board.matrix.get(15, 7).health = 90;
game.board.matrix.get(5, 0).health = 80;
game.board.matrix.get(21, 1).health = 70;
game.board.matrix.get(5, 27).health = 60;
game.board.matrix.get(3, 22).health = 50;
game.board.matrix.get(2, 5).health = 40;
game.board.matrix.get(1, 30).health = 30;
game.board.matrix.get(5, 12).health = 20;
game.board.matrix.get(12, 5).health = 10;
game.board.matrix.get(9, 21).health = 0;
for (let i = 0; i < 1000; i++) {
    game.update();
    readline_1.default.cursorTo(process.stdout, 0, 0);
    // console.clear();
    // console.log(gameOverview(game));
    // console.log(boardOverview(game.board));
    console.log((0, print_1.playerOverview)(game.players[0]));
}
