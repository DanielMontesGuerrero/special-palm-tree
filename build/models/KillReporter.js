"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KillReporter {
    constructor() {
        this.unreportedKills = 0;
        this.totalKills = 0;
    }
    addKill() {
        this.unreportedKills += 1;
    }
    acknowledge() {
        this.totalKills += this.unreportedKills;
        this.unreportedKills = 0;
    }
}
exports.default = KillReporter;
