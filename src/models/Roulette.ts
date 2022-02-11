import RouletteOption, {RouletteActionContext, RouletteSets} from './RouletteOption';

export default class Roulette {
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
    const selectedOptions = this.getOption();
    this.options[selectedOptions].action(ctx);
  }
}
