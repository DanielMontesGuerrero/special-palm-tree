import {hasAtackPiece, selectRandomAtackPiece, weightedRandomChoice} from '../../game/bot/actions';
import Node from '../../game/bot/Node';
import {NodeType} from '../../game/types';
import {changeToKnight, changeToQueen, triggerRoulette} from './basic';
import {increaseActivePieceQuantity, releaseActivePiece, releaseAllPieces} from './utils';

export const changeActivePieceToAtackPiece: Node = {
  type: NodeType.SELECTION,
  action: selectRandomAtackPiece,
  childs: [
    changeToQueen,
    changeToKnight,
  ],
};

export const atack: Node = {
  type: NodeType.SEQUENCE,
  action: () => -1,
  childs: [
    changeActivePieceToAtackPiece,
    increaseActivePieceQuantity(6),
    releaseActivePiece,
  ],
};

export const acquireAtackPiece: Node = {
  type: NodeType.SELECTION,
  action: hasAtackPiece,
  childs: [
    triggerRoulette,
    atack,
  ],
};

export const agressiveBehaviour: Node = {
  type: NodeType.SELECTION,
  action: (ctx) => weightedRandomChoice(ctx, [2, 1]),
  childs: [
    acquireAtackPiece,
    releaseAllPieces,
  ],
};
