"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerOverview = exports.pieceOverview = exports.boardOverview = exports.gameOverview = void 0;
const chalk_1 = __importDefault(require("chalk"));
const types_1 = require("../models/types");
function keyValueText(key, value) {
    return chalk_1.default.blue.italic(`${key}`) + ': ' + chalk_1.default.dim(value);
}
function formattedList(name, list, transform) {
    let listText = `${chalk_1.default.blue.italic(name)}:\n`;
    list.forEach((item) => {
        listText += `\t${transform(item)}\n`;
    });
    return listText;
}
function inlineList(list) {
    const listText = [];
    list.forEach((item) => {
        listText.push(item);
    });
    return chalk_1.default.yellow('[') + listText.join(', ') + chalk_1.default.yellow(']');
}
function nameFromType(type) {
    switch (type) {
        case types_1.PieceType.KING: return 'King';
        case types_1.PieceType.QUEEN: return 'Queen';
        case types_1.PieceType.BISHOP: return 'Bishop';
        case types_1.PieceType.KNIGHT: return 'Knight';
        case types_1.PieceType.ROOK: return 'Rook';
        case types_1.PieceType.PAWN: return 'Pawn';
        default: return '';
    }
}
function gameOverview(game) {
    const scores = game.players
        .map((player) => ({ name: player.name, id: player.id, score: player.score }))
        .sort((a, b) => a.score - b.score);
    const texts = [];
    texts.push(chalk_1.default.bold.inverse.yellow('Game'));
    texts.push(keyValueText('Game time', `${game.getRunningTime()}ms`));
    texts.push(keyValueText('Alive players', inlineList(game.board.getAlivePlayers())));
    texts.push(formattedList('Scores', scores, (player) => `${chalk_1.default.cyan(player.name)}: ${player.score}`));
    return texts.join('\n');
}
exports.gameOverview = gameOverview;
function boardOverview(board) {
    const matrix = [];
    board.matrix.matrix.forEach((row) => {
        const textRow = [];
        row.forEach((cell) => {
            let health = '';
            if (cell.health >= 60) {
                health = chalk_1.default.inverse.green(' ');
            }
            else if (cell.health >= 30) {
                health = chalk_1.default.inverse.yellow(' ');
            }
            else if (cell.health > 0) {
                health = chalk_1.default.inverse.red(' ');
            }
            else {
                health = chalk_1.default.inverse.black(' ');
            }
            textRow.push(health);
        });
        matrix.push(textRow.join(''));
    });
    return chalk_1.default.bold.inverse.yellow('Board\n') + matrix.join('\n');
}
exports.boardOverview = boardOverview;
function pieceOverview(piece) {
    let text = chalk_1.default.bold.red(nameFromType(piece.type));
    if (piece.isActive) {
        text = chalk_1.default.inverse(text);
    }
    text = (0, chalk_1.default)(text, chalk_1.default.dim(`- ${piece.quantity}`));
    return text;
}
exports.pieceOverview = pieceOverview;
function playerOverview(player) {
    const texts = [];
    const hand = formattedList('hand', player.hand, (piece) => {
        return pieceOverview(piece);
    });
    texts.push(chalk_1.default.bold.inverse.yellow('Player'));
    texts.push(keyValueText('name', player.name));
    texts.push(keyValueText('id', player.id));
    texts.push(keyValueText('score', player.score));
    texts.push(hand);
    return texts.join('\n');
}
exports.playerOverview = playerOverview;
