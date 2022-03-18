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

export const RouletteSets = {
  DEFAULT: [
    new RouletteOption('Take piece', 0.2, (ctx: RouletteActionContext) => {
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
    }),
    new RouletteOption('x2', 0.1, (ctx: RouletteActionContext) => {
      ctx.activePiece.quantity *= 2;
    }),
    new RouletteOption('+10', 0.4, (ctx: RouletteActionContext) => {
      ctx.activePiece.quantity += 10;
    }),
    new RouletteOption('-10', 0.1, (ctx: RouletteActionContext) => {
      ctx.activePiece.quantity = Math.max(1, ctx.activePiece.quantity - 10);
    }),
    new RouletteOption('Increase arrow speed', 0.1, (ctx: RouletteActionContext) => {
      ctx.arrow.angularSpeed = Math.min(
        Arrow.maxAngularSpeed,
        ctx.arrow.angularSpeed + RouletteSetsConfig.DEFAULT.increasedAngularSpeed,
      );
    }),
    new RouletteOption('Increase balls speed', 0.1, (ctx: RouletteActionContext) => {
      ctx.board.ballSpeeds[ctx.playerId] = Math.min(
        Ball.maxSpeed,
        ctx.board.ballSpeeds[ctx.playerId] + RouletteSetsConfig.DEFAULT.increasedSpeed,
      );
    }),
  ],
};
