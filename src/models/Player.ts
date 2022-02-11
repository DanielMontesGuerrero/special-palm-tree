import Message from './Message';
import Piece from './Piece';
import Roulette from './Roulette';

export default class Player {
  name: string;

  id: number;

  score: number;

  hand: Piece[];

  roulette: Roulette;

  messages: Message[];

  constructor(player: Player) {
    this.name = player.name;
    this.id = player.id;
    this.hand = player.hand;
    this.score = player.score;
    this.roulette = player.roulette;
    this.messages = player.messages;
  }
}
