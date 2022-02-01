import Board from './Board';
import Player from './Player';
import Event from './Event';

export default class Game {
  board: Board;

  players: Player[];

  events: Event[];

  beginTime: number;

  endTime: number;

  winner: number;

  constructor(game: Game) {
    this.board = game.board;
    this.players = game.players;
    this.events = game.events;
    this.beginTime = game.beginTime;
    this.endTime = game.endTime;
    this.winner = game.winner;
  }
}
