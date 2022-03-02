"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const RouletteOption_1 = require("./RouletteOption");
class Roulette {
    constructor(options = RouletteOption_1.RouletteSets.DEFAULT) {
        this.options = options;
        this.lastTriggered = 0;
    }
    getOption() {
        const randomProbability = Math.random();
        let currProbability = 0;
        for (let i = 0; i < this.options.length; i++) {
            if (currProbability <= randomProbability
                && randomProbability < (currProbability + this.options[i].probability)) {
                return i;
            }
            currProbability += this.options[i].probability;
        }
        return 0;
    }
    onTrigger(ctx) {
        if ((ctx.triggeredAt - this.lastTriggered) >= Roulette.rouletteDelay) {
            const selectedOption = this.getOption();
            ctx.messageManager.pushRouletteOptionSelectedMessage(this.options[selectedOption].name);
            this.options[selectedOption].action(ctx);
            this.lastTriggered = ctx.triggeredAt;
        }
    }
}
exports.default = Roulette;
Roulette.rouletteDelay = config_1.Config.roulette.rouletteDelay;
