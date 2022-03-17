import Game from '../Game';
import {NodeType} from '../types';
import Node from './Node';

export default class BehaviorTree {
  tree: Node;

  game: Game | undefined;

  playerId: number | undefined;

  nodesStack: Node[];

  constructor(tree: Node, game?: Game, playerId?: number) {
    this.tree = tree;
    this.game = game;
    this.playerId = playerId;
    this.nodesStack = [tree];
  }

  bind(game: Game, playerId: number) {
    this.game = game;
    this.playerId = playerId;
  }

  nextAction() {
    if (this.playerId === undefined || this.game === undefined) {
      throw new Error('No binded game');
    }
    if (this.nodesStack.length === 0) this.nodesStack.push(this.tree);
    const currentNode = this.nodesStack.pop();
    if (currentNode !== undefined) {
      if (currentNode.type === NodeType.SEQUENCE) {
        for (let i = currentNode.childs.length - 1; i >= 0; i--) {
          this.nodesStack.push(currentNode.childs[i]);
        }
      } else {
        const childIndex = currentNode.action({playerId: this.playerId, game: this.game});
        this.nodesStack.push(currentNode.childs[childIndex]);
      }
    }
  }
}
