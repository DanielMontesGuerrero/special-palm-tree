"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Board_1 = __importDefault(require("./Board"));
const Player_1 = __importDefault(require("./Player"));
const Event_1 = require("./Event");
const types_1 = require("./types");
const config_1 = require("../config/config");
class Game {
    constructor(players) {
        this.board = new Board_1.default(config_1.Config.rows, config_1.Config.cols);
        this.players = [];
        for (let i = 0; i < players.length; i++) {
            this.players.push(new Player_1.default(players[i], i));
        }
        for (let i = players.length; i < 4; i++) {
            this.players.push(new Player_1.default(`bot ${i + 1}`, i));
        }
        this.events = [];
        this.beginTime = 0;
        this.endTime = 0;
        this.winner = -1;
        this.phase = types_1.GamePhase.IDLE;
    }
    start() {
        this.beginTime = Date.now();
        for (let playerId = 0; playerId < 4; playerId++) {
            this.players[playerId].messageManager.pushStartMessage();
        }
        this.phase = types_1.GamePhase.RUNNING;
    }
    addEvent(event) {
        this.events.push(event);
    }
    update() {
        if (this.phase !== types_1.GamePhase.RUNNING) {
            return;
        }
        const killReporters = [];
        for (let playerId = 0; playerId < 4; playerId++) {
            killReporters.push(this.players[playerId].killReporter);
        }
        this.board.update(killReporters);
        for (let playerId = 0; playerId < 4; playerId++) {
            this.players[playerId].updateScore(types_1.ScoreType.KILL);
            this.players[playerId].messageManager.pushAliveCellsMessage(this.board.matrix.getCountOfAliveCells(playerId), this.board.matrix.getTotalCountOfCells());
            if (this.board.matrix.getCountOfAliveCells(playerId) === 0) {
                for (let notifyPlayerId = 0; notifyPlayerId < 4; notifyPlayerId++) {
                    this.players[notifyPlayerId].messageManager.pushDeadPlayerMessage(playerId, this.players[playerId].name);
                }
            }
        }
        this.processEvents();
        this.checkWinner();
        this.checkTimeLimit();
    }
    processEvents() {
        while (this.events.length > 0) {
            const event = Event_1.Events.get(this.events[0].code);
            if (event !== undefined) {
                event.action({
                    playerId: this.events[0].playerId,
                    triggeredAt: this.events[0].triggeredAt,
                    newActivePiece: this.events[0].newActivePiece,
                    pieceType: this.events[0].pieceType,
                    players: this.players,
                    board: this.board,
                    arrows: this.board.arrows,
                });
            }
            else {
                throw new Error('Invalid event code');
            }
            this.events.shift();
        }
    }
    checkWinner() {
        const alivePlayers = this.board.getAlivePlayers();
        if (alivePlayers.length === 1) {
            [this.winner] = alivePlayers;
        }
        else if (alivePlayers.length === 0) {
            this.winner = this.getPlayerWithGreatestScore();
        }
        if (this.winner !== -1) {
            this.phase = types_1.GamePhase.FINISHED;
            for (let playerId = 0; playerId < 4; playerId++) {
                this.players[playerId].messageManager.pushWinnerMessage(this.winner, this.players[this.winner].name);
            }
            this.endTime = Date.now();
        }
    }
    checkTimeLimit() {
        if (this.getRunningTime() >= Game.timeLimit) {
            for (let playerId = 0; playerId < 4; playerId++) {
                this.players[playerId].messageManager.pushTimeLimitMessage();
            }
            this.winner = this.getPlayerWithGreatestScore();
            for (let playerId = 0; playerId < 4; playerId++) {
                this.players[playerId].messageManager.pushWinnerMessage(this.winner, this.players[this.winner].name);
            }
            this.endTime = Date.now();
            this.phase = types_1.GamePhase.FINISHED;
        }
    }
    getPlayerWithGreatestScore() {
        let playerId = -1;
        let maxScore = -1;
        for (let id = 0; id < 4; id++) {
            if (this.players[id].score > maxScore) {
                maxScore = this.players[id].score;
                playerId = id;
            }
        }
        return playerId;
    }
    getRunningTime() {
        return Date.now() - this.beginTime;
    }
}
exports.default = Game;
Game.timeLimit = config_1.Config.timeLimit;
