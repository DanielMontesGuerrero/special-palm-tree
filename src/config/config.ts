import {PieceType} from '../game/types';

export const Config = {
  rows: 38,
  cols: 38,
  timeLimit: 5 * 60 * 1000,
  numPlayers: 4,
  arrow: {
    angle: 0,
    angularSpeed: Math.PI,
    maxAngularSpeed: 2 * Math.PI,
  },
  roulette: {
    rouletteDelay: 3 * 1000,
  },
  ball: {
    maxSpeed: 2, // cells / second
    defaultSpeed: 1, // cells / sencond,
    releaseDelay: 100,
    maxLifetime: 30 * 1000,
  },
  cell: {
    health: 100,
    defense: 5,
  },
  pieceStats: {
    QUEEN: {
      attack: 75,
      defense: 5,
      health: 1,
    },
    KNIGHT: {
      attack: 55,
      defense: 0,
      health: 0,
    },
    BISHOP: {
      attack: 0,
      defense: 0,
      health: 10,
    },
    ROOK: {
      attack: 0,
      defense: 35,
      health: 0,
    },
    PAWN: {
      attack: 35,
      defense: 0,
      health: 0,
    },
  },
  score: {
    killValue: 10000,
    pieceValue: {
      QUEEN: 3,
      BISHOP: 2,
      KNIGHT: 2,
      ROOK: 2,
      PAWN: 1,
    },
  },
};

export const RouletteSetsConfig = {
  DEFAULT: {
    piecesProbabilities: [
      {type: PieceType.QUEEN, probability: 0.1},
      {type: PieceType.BISHOP, probability: 0.175},
      {type: PieceType.KNIGHT, probability: 0.175},
      {type: PieceType.ROOK, probability: 0.25},
      {type: PieceType.PAWN, probability: 0.3},
    ],
    increasedAngularSpeed: 0.2,
    increasedSpeed: 0.2,
    increasedQuantity: 100,
  },
};
