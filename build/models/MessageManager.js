"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = __importDefault(require("./Message"));
const types_1 = require("./types");
class MessageManager {
    constructor(playerId) {
        this.notifiedHalfCellsAlive = false;
        this.notifiedNineCellsAlive = false;
        this.notifiedDeadPlayer = [false, false, false, false];
        this.messages = [];
        this.playerId = playerId;
    }
    pushRouletteOptionSelectedMessage(optionName) {
        this.messages.push(new Message_1.default(`New roulette effect: ${optionName}`));
    }
    pushPieceReleasedMessage(playerName, piece) {
        this.messages.push(new Message_1.default(`${playerName} is releasing ${piece.quantity} `
            + `${MessageManager.getPieceName(piece)}`));
    }
    pushAliveCellsMessage(aliveCells, totalCells) {
        if (aliveCells < (totalCells / 2) && !this.notifiedHalfCellsAlive) {
            this.messages.push(new Message_1.default(`Only ${aliveCells} cells alive!`, types_1.MessageType.WARNING));
            this.notifiedHalfCellsAlive = true;
        }
        if (aliveCells <= 9 && !this.notifiedNineCellsAlive) {
            this.messages.push(new Message_1.default(`Only ${aliveCells} cells alive!`, types_1.MessageType.WARNING));
            this.notifiedNineCellsAlive = true;
        }
    }
    pushDeadPlayerMessage(deadPlayer, playerName) {
        if (!this.notifiedDeadPlayer[deadPlayer]) {
            if (deadPlayer === this.playerId) {
                this.messages.push(new Message_1.default('You lose', types_1.MessageType.LOSE));
            }
            else {
                this.messages.push(new Message_1.default(`${playerName} is dead`, types_1.MessageType.DEAD_PLAYER));
            }
            this.notifiedDeadPlayer[deadPlayer] = true;
        }
    }
    pushStartMessage() {
        this.messages.push(new Message_1.default('Game started'));
    }
    pushWinnerMessage(winnerId, winnerName) {
        if (winnerId === this.playerId) {
            this.messages.push(new Message_1.default('You win', types_1.MessageType.WIN));
        }
        else {
            this.messages.push(new Message_1.default(`${winnerName} is the winner`, types_1.MessageType.WIN));
        }
    }
    pushTimeLimitMessage() {
        this.messages.push(new Message_1.default('Time limit exceeded, who is the winner?'));
    }
    static getPieceName(piece) {
        let name = '';
        switch (piece.type) {
            case types_1.PieceType.KING:
                name = 'King';
                break;
            case types_1.PieceType.QUEEN:
                name = 'Queen';
                break;
            case types_1.PieceType.BISHOP:
                name = 'Bishop';
                break;
            case types_1.PieceType.KNIGHT:
                name = 'Knight';
                break;
            case types_1.PieceType.ROOK:
                name = 'Rook';
                break;
            case types_1.PieceType.PAWN:
                name = 'Pawn';
                break;
            default: break;
        }
        if (piece.quantity > 1) {
            name += 's';
        }
        return name;
    }
}
exports.default = MessageManager;
