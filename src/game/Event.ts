import Arrow from './Arrow';
import Board from './Board';
import Player from './Player';
import {EventCode, PieceType, ScoreType} from './types';

export type EventContext = {
  playerId: number;
  triggeredAt?: number;
  newActivePiece?: number;
  pieceType?: PieceType;
  players: Player[];
  board: Board;
  arrows: Arrow[];
};

export type EnqueuedEvent = {
  code: EventCode;
  playerId: number;
  triggeredAt?: number;
  newActivePiece?: number;
  pieceType?: PieceType;
};

export default class Event {
  code: EventCode;

  action: (ctx: EventContext) => void;

  constructor(code: EventCode, action: (ctx: EventContext) => void) {
    this.code = code;
    this.action = action;
  }
}

export const Events = new Map([
  [EventCode.ROULETTE_TRIGGERED, new Event(EventCode.ROULETTE_TRIGGERED, (ctx: EventContext) => {
    if (ctx.triggeredAt === undefined) {
      throw new Error('No triggeredAt in EventContext');
    }
    ctx.players[ctx.playerId].roulette.onTrigger({
      hand: ctx.players[ctx.playerId].hand,
      activePiece: ctx.players[ctx.playerId].activePiece,
      arrow: ctx.board.arrows[ctx.playerId],
      board: ctx.board,
      playerId: ctx.playerId,
      triggeredAt: ctx.triggeredAt,
      messageManager: ctx.players[ctx.playerId].messageManager,
    });
  })],
  [
    EventCode.CHANGED_ACTIVE_PIECE,
    new Event(EventCode.CHANGED_ACTIVE_PIECE, (ctx: EventContext) => {
      if (ctx.newActivePiece === undefined) {
        throw new Error('No newActivePiece in EventContext');
      }
      ctx.players[ctx.playerId].changeActivePiece(ctx.newActivePiece);
    }),
  ],
  [EventCode.RELEASE_PIECE, new Event(EventCode.RELEASE_PIECE, (ctx: EventContext) => {
    if (ctx.pieceType === undefined) {
      throw new Error('No pieceType in EventContext');
    }
    for (let i = 0; i < ctx.players.length; i++) {
      ctx.players[i].messageManager.pushPieceReleasedMessage(
        ctx.players[ctx.playerId].name,
        ctx.players[ctx.playerId].hand[ctx.pieceType],
      );
    }
    ctx.players[ctx.playerId].updateScore(
      ScoreType.PIECE_RELEASED,
      ctx.players[ctx.playerId].hand[ctx.pieceType],
    );
    ctx.board.addBalls(ctx.playerId, ctx.players[ctx.playerId].hand[ctx.pieceType]);
    ctx.players[ctx.playerId].removePiece(ctx.pieceType);
  })],
]);
