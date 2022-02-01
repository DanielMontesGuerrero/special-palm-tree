import {Message} from './Message';
import Arrow from './Arrow';
import {Piece} from './Piece';
import {Roulette} from './Roulette';

export default class Player {
  name: string;

  id: number;

  arrow: Arrow;

  score: number;

  hand: Piece[];

  roulette: Roulette;

  messages: Message[];

  constructor(player: Player) {
    this.name = player.name;
    this.id = player.id;
    this.arrow = player.arrow;
    this.hand = player.hand;
    this.score = player.score;
    this.roulette = player.roulette;
    this.messages = player.messages;
  }
}
