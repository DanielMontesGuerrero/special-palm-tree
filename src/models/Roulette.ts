import RouletteOption from './RouletteOption';

export default class Roulette {
  lastTriggered: number;

  options: RouletteOption[];

  getOption: () => void;
}
