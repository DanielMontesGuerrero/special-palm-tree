import Node from '../../game/bot/Node';
import {NodeType} from '../../game/types';
import {triggerRoulette} from './basic';
import {releaseActivePiece as releaseActive, releasePieceWithMostQuantity as releasePieceWithMostQuantityAction} from '../../game/bot/actions';

export const increaseActivePieceQuantity: Node = {
  type: NodeType.SEQUENCE,
  action: () => -1,
  childs: [
    triggerRoulette,
    triggerRoulette,
    triggerRoulette,
    triggerRoulette,
    triggerRoulette,
  ],
};

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
