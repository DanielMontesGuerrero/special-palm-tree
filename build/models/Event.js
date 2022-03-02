"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = void 0;
const types_1 = require("./types");
class Event {
    constructor(code, action) {
        this.code = code;
        this.action = action;
    }
}
exports.default = Event;
exports.Events = new Map([
    [types_1.EventCode.ROULETTE_TRIGGERED, new Event(types_1.EventCode.ROULETTE_TRIGGERED, (ctx) => {
            if (ctx.triggeredAt === undefined) {
                throw new Error('No triggeredAt in EventContext');
            }
            ctx.players[ctx.playerId].roulette.onTrigger({
                hand: ctx.players[ctx.playerId].hand,
                activePiece: ctx.players[ctx.playerId].activePiece,
                arrow: ctx.board.arrows[ctx.playerId],
                board: ctx.board,
                playerId: ctx.playerId,
                triggeredAt: ctx.triggeredAt,
                messageManager: ctx.players[ctx.playerId].messageManager,
            });
        })],
    [
        types_1.EventCode.CHANGED_ACTIVE_PIECE,
        new Event(types_1.EventCode.CHANGED_ACTIVE_PIECE, (ctx) => {
            if (ctx.newActivePiece === undefined) {
                throw new Error('No newActivePiece in EventContext');
            }
            ctx.players[ctx.playerId].changeActivePiece(ctx.newActivePiece);
        }),
    ],
    [types_1.EventCode.RELEASE_PIECE, new Event(types_1.EventCode.RELEASE_PIECE, (ctx) => {
            if (ctx.pieceType === undefined) {
                throw new Error('No pieceType in EventContext');
            }
            for (let i = 0; i < ctx.players.length; i++) {
                ctx.players[i].messageManager.pushPieceReleasedMessage(ctx.players[ctx.playerId].name, ctx.players[ctx.playerId].hand[ctx.pieceType]);
            }
            ctx.players[ctx.playerId].updateScore(types_1.ScoreType.PIECE_RELEASED, ctx.players[ctx.playerId].hand[ctx.pieceType]);
            ctx.board.addBalls(ctx.playerId, ctx.players[ctx.playerId].hand[ctx.pieceType]);
            ctx.players[ctx.playerId].removePiece(ctx.pieceType);
        })],
]);
