"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
class Cell {
    constructor(health = config_1.Config.cell.health, defense = config_1.Config.cell.defense) {
        this.health = health;
        this.defense = defense;
    }
    isAlive() {
        return this.health > 0;
    }
    applyDamage(attack) {
        this.health -= Math.max(0, attack - 4 * this.defense ** (1 / 1.7));
        if (this.health < 0)
            this.health = 0;
    }
    applyDefense(defense) {
        if (this.isAlive()) {
            this.defense = Math.min(100, this.defense + defense);
        }
    }
    applyHealth(health) {
        if (this.isAlive()) {
            this.health = Math.min(100, this.health + health);
        }
    }
}
exports.default = Cell;
