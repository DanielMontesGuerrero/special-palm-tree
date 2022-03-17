import {hasDefensivePiece, selectRandomDefensivePiece, weightedRandomChoice} from '../../game/bot/actions';
import Node from '../../game/bot/Node';
import {NodeType} from '../../game/types';
import {
  changeToBishop, changeToRook, triggerRoulette,
} from './basic';
import {increaseActivePieceQuantity, releaseActivePiece, releasePieceWithMostQuantity} from './utils';

export const changeActivePieceToDefensivePiece: Node = {
  type: NodeType.SELECTION,
  action: selectRandomDefensivePiece,
  childs: [
    changeToRook,
    changeToBishop,
  ],
};

export const defend: Node = {
  type: NodeType.SEQUENCE,
  action: () => -1,
  childs: [
    changeActivePieceToDefensivePiece,
    increaseActivePieceQuantity(),
    releaseActivePiece,
  ],
};

export const acquireDefensivePiece: Node = {
  type: NodeType.SELECTION,
  action: hasDefensivePiece,
  childs: [
    triggerRoulette,
    defend,
  ],
};

export const defensiveBehavior: Node = {
  type: NodeType.SELECTION,
  action: (ctx) => weightedRandomChoice(ctx, [4, 1]),
  childs: [
    acquireDefensivePiece,
    releasePieceWithMostQuantity,
  ],
};
