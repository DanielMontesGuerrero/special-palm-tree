import {randomChoice} from '../../game/bot/actions';
import Node from '../../game/bot/Node';
import {NodeType} from '../../game/types';
import {
  changeToBishop,
  changeToKnight,
  changeToPawn,
  changeToQueen,
  changeToRook,
  releaseBishop,
  releaseKnight,
  releasePawn,
  releaseQueen,
  releaseRook,
  triggerRoulette,
} from './basic';

export const releaseRandomPiece: Node = {
  type: NodeType.SELECTION,
  action: (ctx) => randomChoice(ctx, 5),
  childs: [
    releaseQueen,
    releaseBishop,
    releaseKnight,
    releaseRook,
    releasePawn,
  ],
};

export const changeRandomlyActivePiece: Node = {
  type: NodeType.SELECTION,
  action: (ctx) => randomChoice(ctx, 5),
  childs: [
    changeToQueen,
    changeToBishop,
    changeToKnight,
    changeToRook,
    changeToPawn,
  ],
};

export const randomBasicAction: Node = {
  type: NodeType.SELECTION,
  action: (ctx) => randomChoice(ctx, 3),
  childs: [
    releaseRandomPiece,
    changeRandomlyActivePiece,
    triggerRoulette,
  ],
};
