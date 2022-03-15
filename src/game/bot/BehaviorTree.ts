import Game from '../Game';
import Node from './Node';

export default class BehaviorTree {
  tree: Node;

  currentNode: Node;

  game: Game | undefined;

  playerId: number | undefined;

  constructor(tree: Node, game?: Game, playerId?: number) {
    this.tree = tree;
    this.currentNode = tree;
    this.game = game;
    this.playerId = playerId;
  }

  bind(game: Game, playerId: number) {
    this.game = game;
    this.playerId = playerId;
  }
}
