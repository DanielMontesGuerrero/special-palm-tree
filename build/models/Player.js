"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const KillReporter_1 = __importDefault(require("./KillReporter"));
const MessageManager_1 = __importDefault(require("./MessageManager"));
const Piece_1 = __importDefault(require("./Piece"));
const Roulette_1 = __importDefault(require("./Roulette"));
const types_1 = require("./types");
class Player {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.hand = [
            new Piece_1.default(types_1.PieceType.KING),
            new Piece_1.default(types_1.PieceType.QUEEN),
            new Piece_1.default(types_1.PieceType.BISHOP),
            new Piece_1.default(types_1.PieceType.KNIGHT),
            new Piece_1.default(types_1.PieceType.ROOK),
            new Piece_1.default(types_1.PieceType.PAWN, 1, true),
        ];
        [, , , , , this.activePiece] = this.hand;
        this.score = 0;
        this.roulette = new Roulette_1.default();
        this.messageManager = new MessageManager_1.default(id);
        this.killReporter = new KillReporter_1.default();
    }
    changeActivePiece(type) {
        this.activePiece.isActive = false;
        this.activePiece = this.hand[type];
        this.activePiece.isActive = true;
    }
    updateScore(type, piece = null) {
        const getPiceValue = (pieceType) => {
            switch (pieceType) {
                case types_1.PieceType.QUEEN: return config_1.Config.score.pieceValue.QUEEN;
                case types_1.PieceType.BISHOP: return config_1.Config.score.pieceValue.BISHOP;
                case types_1.PieceType.KNIGHT: return config_1.Config.score.pieceValue.KNIGHT;
                case types_1.PieceType.ROOK: return config_1.Config.score.pieceValue.ROOK;
                case types_1.PieceType.PAWN: return config_1.Config.score.pieceValue.PAWN;
                default: return 0;
            }
        };
        switch (type) {
            case types_1.ScoreType.KILL:
                this.score += this.killReporter.unreportedKills * config_1.Config.score.killValue;
                this.killReporter.acknowledge();
                break;
            case types_1.ScoreType.PIECE_RELEASED:
                if (piece === null) {
                    throw new Error('Missing piece argument');
                }
                else {
                    this.score += piece.quantity * getPiceValue(piece.type);
                }
                break;
            default:
                break;
        }
    }
    removePiece(type) {
        if (type === types_1.PieceType.PAWN) {
            this.hand[type].quantity = 1;
        }
        else {
            this.hand[type].clear();
            this.changeActivePiece(types_1.PieceType.PAWN);
        }
    }
}
exports.default = Player;
