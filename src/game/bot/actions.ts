import Game from '../Game';
import Roulette from '../Roulette';
import {EventCode, PieceType} from '../types';

export type ActionContext = {
  playerId: number;
  game: Game;
};

export function isRouletteAvailable(ctx: ActionContext) {
  const {lastTriggered, locked} = ctx.game.players[ctx.playerId].roulette;
  if ((Date.now() - lastTriggered) >= Roulette.rouletteDelay && !locked) return 1;
  return 0;
}

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

export function releaseActivePiece(ctx: ActionContext) {
  return releasePiece(ctx, ctx.game.players[ctx.playerId].activePiece.type);
}

export function randomChoice(ctx: ActionContext, upperBound = 1, lowerBound = 0) {
  return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
}

export function weightedRandomChoice(ctx: ActionContext, weights: number[]) {
  if (weights.length === 0) return -1;
  let totalWeight = 0;
  weights.forEach((weight) => {
    totalWeight += weight;
  });
  const probabilities = weights.map((weight) => weight / totalWeight);
  const randomValue = Math.random();
  let currentProbability = 0;
  for (let i = 0; i < weights.length; i++) {
    if (currentProbability <= randomValue
        && randomValue < (currentProbability + probabilities[i])) return i;
    currentProbability += probabilities[i];
  }
  return -1;
}

export function hasDefensivePiece(ctx: ActionContext) {
  const defensivePieces = ctx.game.players[ctx.playerId].hand[PieceType.ROOK].quantity
  + ctx.game.players[ctx.playerId].hand[PieceType.BISHOP].quantity;
  if (defensivePieces > 0) return 1;
  return 0;
}

export function selectRandomDefensivePiece(ctx: ActionContext) {
  if (ctx.game.players[ctx.playerId].hand[PieceType.ROOK].quantity > 0
    && ctx.game.players[ctx.playerId].hand[PieceType.BISHOP].quantity > 0) {
    return randomChoice(ctx);
  }
  if (ctx.game.players[ctx.playerId].hand[PieceType.ROOK].quantity > 0) {
    return 0;
  }
  if (ctx.game.players[ctx.playerId].hand[PieceType.BISHOP].quantity > 0) {
    return 1;
  }
  return -1;
}

export function releasePieceWithMostQuantity(ctx: ActionContext, lowerBound = 50) {
  let maxQuantity = lowerBound;
  let pieceType = PieceType.PAWN;
  ctx.game.players[ctx.playerId].hand.forEach((piece) => {
    if (maxQuantity < piece.quantity) {
      maxQuantity = piece.quantity;
      pieceType = piece.type;
    }
  });
  return releasePiece(ctx, pieceType);
}

export function releaseAllPieces(ctx: ActionContext) {
  ctx.game.players[ctx.playerId].hand.forEach((piece) => {
    releasePiece(ctx, piece.type);
  });
  return -1;
}

export function hasAtackPiece(ctx: ActionContext) {
  const atackPieces = ctx.game.players[ctx.playerId].hand[PieceType.QUEEN].quantity
  + ctx.game.players[ctx.playerId].hand[PieceType.KNIGHT].quantity;
  if (atackPieces > 0) return 1;
  return 0;
}

export function selectRandomAtackPiece(ctx: ActionContext) {
  if (ctx.game.players[ctx.playerId].hand[PieceType.QUEEN].quantity > 0
    && ctx.game.players[ctx.playerId].hand[PieceType.KNIGHT].quantity > 0) {
    return randomChoice(ctx);
  }
  if (ctx.game.players[ctx.playerId].hand[PieceType.QUEEN].quantity > 0) {
    return 0;
  }
  if (ctx.game.players[ctx.playerId].hand[PieceType.KNIGHT].quantity > 0) {
    return 1;
  }
  return -1;
}
