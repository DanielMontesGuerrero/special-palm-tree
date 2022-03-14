import {Config} from '../config/config';
import RouletteOption, {RouletteActionContext, RouletteSets} from './RouletteOption';

export default class Roulette {
  static rouletteDelay = Config.roulette.rouletteDelay;

  lastTriggered: number;

  options: RouletteOption[];

  locked: boolean;

  selectedOption: number;

  constructor(options = RouletteSets.DEFAULT) {
    this.options = options;
    this.lastTriggered = 0;
    this.locked = false;
    this.selectedOption = -1;
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

  onTrigger(triggeredAt: number) {
    if ((triggeredAt - this.lastTriggered) >= Roulette.rouletteDelay && !this.locked) {
      this.selectedOption = this.getOption();
      this.locked = true;
      this.lastTriggered = triggeredAt;
    }
  }

  onAck(ctx: RouletteActionContext) {
    if (this.selectedOption !== -1) {
      ctx.messageManager.pushRouletteOptionSelectedMessage(this.options[this.selectedOption].name);
      this.options[this.selectedOption].action(ctx);
      this.locked = false;
      this.selectedOption = -1;
    }
  }
}
