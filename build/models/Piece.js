"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const config_1 = require("../config/config");
class Piece {
    constructor(type, quantity = 0, isActive = false) {
        this.type = type;
        this.quantity = quantity;
        this.isActive = isActive;
    }
    clear() {
        this.quantity = 0;
    }
    static applyEffect(ctx) {
        let dx = [];
        let dy = [];
        switch (ctx.pieceType) {
            case types_1.PieceType.QUEEN:
                dx = [-1, 0, 1];
                dy = [-1, 0, 1];
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        const row = (ctx.row + dy[i] + ctx.matrix.rows) % ctx.matrix.rows;
                        const col = (ctx.col + dx[j] + ctx.matrix.cols) % ctx.matrix.cols;
                        if (ctx.matrix.getPlayerId(row, col) !== ctx.playerId) {
                            ctx.matrix.get(row, col).applyDamage(config_1.Config.pieceStats.QUEEN.attack);
                            ctx.matrix.reportDeadCell(row, col, ctx.killReporters[ctx.playerId]);
                        }
                        else {
                            ctx.matrix.get(row, col).applyDefense(config_1.Config.pieceStats.QUEEN.defense);
                            ctx.matrix.get(row, col).applyHealth(config_1.Config.pieceStats.QUEEN.health);
                        }
                    }
                }
                break;
            case types_1.PieceType.BISHOP:
                ctx.matrix.get(ctx.row, ctx.col).applyHealth(config_1.Config.pieceStats.BISHOP.health);
                break;
            case types_1.PieceType.KNIGHT:
                dx = [-1, 0, 0, 0, 1];
                dy = [0, -1, 0, 1, 0];
                for (let i = 0; i < 5; i++) {
                    const row = (ctx.row + dy[i] + ctx.matrix.rows) % ctx.matrix.rows;
                    const col = (ctx.col + dx[i] + ctx.matrix.cols) % ctx.matrix.cols;
                    if (ctx.matrix.getPlayerId(row, col) !== ctx.playerId) {
                        ctx.matrix.get(row, col).applyDamage(config_1.Config.pieceStats.KNIGHT.attack);
                        ctx.matrix.reportDeadCell(row, col, ctx.killReporters[ctx.playerId]);
                    }
                }
                break;
            case types_1.PieceType.ROOK:
                ctx.matrix.get(ctx.row, ctx.col).applyDefense(config_1.Config.pieceStats.ROOK.defense);
                break;
            case types_1.PieceType.PAWN:
                ctx.matrix.get(ctx.row, ctx.col).applyDamage(config_1.Config.pieceStats.PAWN.attack);
                ctx.matrix.reportDeadCell(ctx.row, ctx.col, ctx.killReporters[ctx.playerId]);
                break;
            default:
                break;
        }
    }
}
exports.default = Piece;
