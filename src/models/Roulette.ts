import RouletteOption, {RouletteActionContext, RouletteSets} from './RouletteOption';

export default class Roulette {
  static rouletteDelay = 3000;

  lastTriggered: number;

  options: RouletteOption[];

  constructor(options = RouletteSets.DEFAULT) {
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

  onTrigger(ctx: RouletteActionContext) {
    if ((ctx.triggeredAt - this.lastTriggered) >= Roulette.rouletteDelay) {
      const selectedOption = this.getOption();
      ctx.messageManager.pushRouletteOptionSelectedMessage(this.options[selectedOption].name);
      this.options[selectedOption].action(ctx);
      this.lastTriggered = ctx.triggeredAt;
    }
  }
}
