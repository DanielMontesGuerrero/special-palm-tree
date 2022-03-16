import Game from '../Game';
import {EventCode, PieceType} from '../types';

export type ActionContext = {
  playerId: number;
  game: Game;
};

export function triggerRoulette(ctx: ActionContext) {
  ctx.game.addEvent({
    code: EventCode.TRIGGERED_ROULETTE,
    playerId: ctx.playerId,
    triggeredAt: Date.now(),
  });
  ctx.game.addEvent({
    code: EventCode.ACKNOWLEDGED_ROULETTE,
    playerId: ctx.playerId,
  });
  return -1;
}

export function changeActivePiece(ctx: ActionContext, piece: PieceType) {
  ctx.game.addEvent({
    code: EventCode.CHANGED_ACTIVE_PIECE,
    playerId: ctx.playerId,
    newActivePiece: piece,
  });
  return -1;
}

export function releasePiece(ctx: ActionContext, piece: PieceType) {
  ctx.game.addEvent({
    code: EventCode.RELEASED_PIECE,
    playerId: ctx.playerId,
    pieceType: piece,
  });
  return -1;
}

export function randomChoice(ctx: ActionContext, upperBound = 1, lowerBound = 0) {
  return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
}
