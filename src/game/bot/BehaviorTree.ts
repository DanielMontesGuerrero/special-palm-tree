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

  nextAction() {
    if (this.playerId === undefined || this.game === undefined) {
      throw new Error('No binded game');
    }
    const childIndex = this.currentNode.action({playerId: this.playerId, game: this.game});
    const child = this.currentNode.childs[childIndex];
    if (child === undefined) {
      this.currentNode = this.tree;
    } else {
      this.currentNode = child;
    }
  }
}
