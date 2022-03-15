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
  newActivePiece?: PieceType;
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
  [EventCode.TRIGGERED_ROULETTE, new Event(EventCode.TRIGGERED_ROULETTE, (ctx: EventContext) => {
    if (ctx.triggeredAt === undefined) {
      throw new Error('No triggeredAt in EventContext');
    }
    ctx.players[ctx.playerId].roulette.onTrigger(ctx.triggeredAt);
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
  [EventCode.RELEASED_PIECE, new Event(EventCode.RELEASED_PIECE, (ctx: EventContext) => {
    if (ctx.pieceType === undefined) {
      throw new Error('No pieceType in EventContext');
    }
    if (ctx.players[ctx.playerId].hand[ctx.pieceType].quantity === 0) return;
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
  [
    EventCode.ACKNOWLEDGED_ROULETTE,
    new Event(EventCode.ACKNOWLEDGED_ROULETTE, (ctx: EventContext) => {
      ctx.players[ctx.playerId].roulette.onAck({
        hand: ctx.players[ctx.playerId].hand,
        activePiece: ctx.players[ctx.playerId].activePiece,
        arrow: ctx.board.arrows[ctx.playerId],
        board: ctx.board,
        playerId: ctx.playerId,
        messageManager: ctx.players[ctx.playerId].messageManager,
      });
    }),
  ],
]);
