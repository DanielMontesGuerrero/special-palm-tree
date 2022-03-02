"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamePhase = exports.ScoreType = exports.EventCode = exports.MessageType = exports.PieceType = void 0;
var PieceType;
(function (PieceType) {
    PieceType[PieceType["KING"] = 0] = "KING";
    PieceType[PieceType["QUEEN"] = 1] = "QUEEN";
    PieceType[PieceType["BISHOP"] = 2] = "BISHOP";
    PieceType[PieceType["KNIGHT"] = 3] = "KNIGHT";
    PieceType[PieceType["ROOK"] = 4] = "ROOK";
    PieceType[PieceType["PAWN"] = 5] = "PAWN";
})(PieceType = exports.PieceType || (exports.PieceType = {}));
var MessageType;
(function (MessageType) {
    MessageType[MessageType["INFO"] = 0] = "INFO";
    MessageType[MessageType["WIN"] = 1] = "WIN";
    MessageType[MessageType["LOSE"] = 2] = "LOSE";
    MessageType[MessageType["WARNING"] = 3] = "WARNING";
    MessageType[MessageType["DEAD_PLAYER"] = 4] = "DEAD_PLAYER";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var EventCode;
(function (EventCode) {
    EventCode[EventCode["ROULETTE_TRIGGERED"] = 0] = "ROULETTE_TRIGGERED";
    EventCode[EventCode["CHANGED_ACTIVE_PIECE"] = 1] = "CHANGED_ACTIVE_PIECE";
    EventCode[EventCode["RELEASE_PIECE"] = 2] = "RELEASE_PIECE";
})(EventCode = exports.EventCode || (exports.EventCode = {}));
var ScoreType;
(function (ScoreType) {
    ScoreType[ScoreType["KILL"] = 0] = "KILL";
    ScoreType[ScoreType["PIECE_RELEASED"] = 1] = "PIECE_RELEASED";
})(ScoreType = exports.ScoreType || (exports.ScoreType = {}));
var GamePhase;
(function (GamePhase) {
    GamePhase[GamePhase["IDLE"] = 0] = "IDLE";
    GamePhase[GamePhase["RUNNING"] = 1] = "RUNNING";
    GamePhase[GamePhase["FINISHED"] = 2] = "FINISHED";
})(GamePhase = exports.GamePhase || (exports.GamePhase = {}));
