import {changeActivePiece, releasePiece, triggerRoulette as trigger} from '../../game/bot/actions';
import Node from '../../game/bot/Node';
import {NodeType, PieceType} from '../../game/types';

export const releaseQueen: Node = {
  type: NodeType.ACTION,
  action: (ctx) => releasePiece(ctx, PieceType.QUEEN),
  childs: [],
};
export const releaseBishop: Node = {
  type: NodeType.ACTION,
  action: (ctx) => releasePiece(ctx, PieceType.BISHOP),
  childs: [],
};
export const releaseKnight: Node = {
  type: NodeType.ACTION,
  action: (ctx) => releasePiece(ctx, PieceType.KNIGHT),
  childs: [],
};
export const releaseRook: Node = {
  type: NodeType.ACTION,
  action: (ctx) => releasePiece(ctx, PieceType.ROOK),
  childs: [],
};
export const releasePawn: Node = {
  type: NodeType.ACTION,
  action: (ctx) => releasePiece(ctx, PieceType.PAWN),
  childs: [],
};

export const changeToQueen: Node = {
  type: NodeType.ACTION,
  action: (ctx) => changeActivePiece(ctx, PieceType.QUEEN),
  childs: [],
};
export const changeToBishop: Node = {
  type: NodeType.ACTION,
  action: (ctx) => changeActivePiece(ctx, PieceType.BISHOP),
  childs: [],
};
export const changeToKnight: Node = {
  type: NodeType.ACTION,
  action: (ctx) => changeActivePiece(ctx, PieceType.KNIGHT),
  childs: [],
};
export const changeToRook: Node = {
  type: NodeType.ACTION,
  action: (ctx) => changeActivePiece(ctx, PieceType.ROOK),
  childs: [],
};
export const changeToPawn: Node = {
  type: NodeType.ACTION,
  action: (ctx) => changeActivePiece(ctx, PieceType.PAWN),
  childs: [],
};

export const triggerRoulette: Node = {
  type: NodeType.ACTION,
  action: trigger,
  childs: [],
};
