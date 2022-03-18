import Node from '../../game/bot/Node';
import {NodeType} from '../../game/types';
import {triggerRoulette} from './basic';
import {releaseActivePiece as releaseActive, releasePieceWithMostQuantity as releasePieceWithMostQuantityAction, releaseAllPieces as releaseAll} from '../../game/bot/actions';

export function increaseActivePieceQuantity(iterations = 5) {
  const childs: Node[] = [];
  for (let i = 0; i < iterations; i++) {
    childs.push(triggerRoulette);
  }
  const node = {
    type: NodeType.SEQUENCE,
    action: () => -1,
    childs,
  };
  return node;
}

export const releaseActivePiece: Node = {
  type: NodeType.ACTION,
  action: releaseActive,
  childs: [],
};

export const releasePieceWithMostQuantity: Node = {
  type: NodeType.ACTION,
  action: releasePieceWithMostQuantityAction,
  childs: [],
};

export const releaseAllPieces: Node = {
  type: NodeType.ACTION,
  action: releaseAll,
  childs: [],
};
