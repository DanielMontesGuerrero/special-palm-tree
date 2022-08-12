import Ball from './Ball';
import Piece from './Piece';
import Arrow from './Arrow';
import Board from './Board';
import MessageManager from './MessageManager';
import {RouletteSetsConfig} from '../config/config';

export interface RouletteActionContext {
  hand: Piece[];
  activePiece: Piece;
  arrow: Arrow;
  board: Board;
  playerId: number;
  messageManager: MessageManager;
}

export default class RouletteOption {
  name: string;

  probability: number;

  action: (ctx: RouletteActionContext) => void;

  constructor(name: string, probability: number, action: (ctx: RouletteActionContext) => void) {
    this.name = name;
    this.probability = probability;
    this.action = action;
  }
}

const RouletteActions = {
  TAKE_PIECE: (ctx: RouletteActionContext) => {
    let currProbability = 0;
    let selectedPiece = 0;
    const randomProb = Math.random();
    for (let i = 0; i < RouletteSetsConfig.DEFAULT.piecesProbabilities.length; i++) {
      if (currProbability <= randomProb && randomProb < (currProbability
          + RouletteSetsConfig.DEFAULT.piecesProbabilities[i].probability)) {
        selectedPiece = RouletteSetsConfig.DEFAULT.piecesProbabilities[i].type;
        break;
      }
      currProbability += RouletteSetsConfig.DEFAULT.piecesProbabilities[i].probability;
    }
    if (ctx.hand[selectedPiece].quantity > 0) {
      ctx.hand[selectedPiece].quantity += RouletteSetsConfig.DEFAULT.increasedQuantity;
    } else {
      ctx.hand[selectedPiece].quantity = 1;
    }
  },
  MULTIPLY_ACTIVE_BY_2: (ctx: RouletteActionContext) => {
    ctx.activePiece.quantity *= 2;
  },
  ADD_10_TO_ACTIVE: (ctx: RouletteActionContext) => {
    ctx.activePiece.quantity += 10;
  },
  SUBSTRACT_10_TO_ACTIVE: (ctx: RouletteActionContext) => {
    ctx.activePiece.quantity = Math.max(1, ctx.activePiece.quantity - 10);
  },
  INCREASE_ARROW_SPEED: (ctx: RouletteActionContext) => {
    ctx.arrow.angularSpeed = Math.min(
      Arrow.maxAngularSpeed,
      ctx.arrow.angularSpeed + RouletteSetsConfig.DEFAULT.increasedAngularSpeed,
    );
  },
  INCREASE_BALLS_SPEED: (ctx: RouletteActionContext) => {
    ctx.board.ballSpeeds[ctx.playerId] = Math.min(
      Ball.maxSpeed,
      ctx.board.ballSpeeds[ctx.playerId] + RouletteSetsConfig.DEFAULT.increasedSpeed,
    );
  },
};

export const RouletteSets = {
  DEFAULT: [
    new RouletteOption('Take piece', 0.2, RouletteActions.TAKE_PIECE),
    new RouletteOption('x2', 0.1, RouletteActions.MULTIPLY_ACTIVE_BY_2),
    new RouletteOption('+10', 0.4, RouletteActions.ADD_10_TO_ACTIVE),
    new RouletteOption('-10', 0.1, RouletteActions.SUBSTRACT_10_TO_ACTIVE),
    new RouletteOption('Increase arrow speed', 0.1, (ctx: RouletteActionContext) => {
      if (ctx.arrow.angularSpeed >= Arrow.maxAngularSpeed) {
        ctx.messageManager.pushOverrideRouletteAction('Increase arrow speed', 'x2', 'you have maximum speed');
        RouletteActions.MULTIPLY_ACTIVE_BY_2(ctx);
      } else {
        RouletteActions.INCREASE_ARROW_SPEED(ctx);
      }
    }),
    new RouletteOption('Increase balls speed', 0.1, (ctx: RouletteActionContext) => {
      if (ctx.board.ballSpeeds[ctx.playerId] >= Ball.maxSpeed) {
        ctx.messageManager.pushOverrideRouletteAction('Increase balls speed', 'x2', 'you have maximum speed');
        RouletteActions.MULTIPLY_ACTIVE_BY_2(ctx);
      } else {
        RouletteActions.INCREASE_BALLS_SPEED(ctx);
      }
    }),
  ],
};
