import Arrow, {DefaultVaules as ArrowDefaults} from '../src/models/Arrow';
import Board, {DefaultVaules as BoardDefaults} from '../src/models/Board';
import Piece from '../src/models/Piece';
import Roulette from '../src/models/Roulette';
import {RouletteSets, RouletteSetsConfig} from '../src/models/RouletteOption';
import {PieceType} from '../src/models/types';

describe('Roulette', () => {
  test('RouletteSet-DEFAULT', () => {
    const hand = [
      new Piece(PieceType.KING),
      new Piece(PieceType.QUEEN),
      new Piece(PieceType.BISHOP),
      new Piece(PieceType.KNIGHT),
      new Piece(PieceType.ROOK),
      new Piece(PieceType.PAWN),
    ];
    const ctx = {
      hand,
      activePiece: hand[1],
      arrow: new Arrow(),
      board: new Board(10, 10),
      playerId: 1,
    };

    /* -- Take piece -- */

    let mockRandomNumber = 0;
    jest.spyOn(global.Math, 'random').mockReturnValue(mockRandomNumber);
    RouletteSets.DEFAULT[0].action(ctx);
    expect(ctx.hand[PieceType.QUEEN].quantity).toBe(1);

    mockRandomNumber += RouletteSetsConfig.DEFAULT.piecesProbabilities[0].probability;
    jest.spyOn(global.Math, 'random').mockReturnValue(mockRandomNumber);
    RouletteSets.DEFAULT[0].action(ctx);
    expect(ctx.hand[PieceType.BISHOP].quantity).toBe(1);

    mockRandomNumber += RouletteSetsConfig.DEFAULT.piecesProbabilities[1].probability;
    jest.spyOn(global.Math, 'random').mockReturnValue(mockRandomNumber);
    RouletteSets.DEFAULT[0].action(ctx);
    expect(ctx.hand[PieceType.KNIGHT].quantity).toBe(1);

    mockRandomNumber += RouletteSetsConfig.DEFAULT.piecesProbabilities[2].probability;
    jest.spyOn(global.Math, 'random').mockReturnValue(mockRandomNumber);
    RouletteSets.DEFAULT[0].action(ctx);
    expect(ctx.hand[PieceType.ROOK].quantity).toBe(1);

    mockRandomNumber += RouletteSetsConfig.DEFAULT.piecesProbabilities[3].probability;
    jest.spyOn(global.Math, 'random').mockReturnValue(mockRandomNumber);
    RouletteSets.DEFAULT[0].action(ctx);
    expect(ctx.hand[PieceType.PAWN].quantity).toBe(1);

    // piece already in hand
    RouletteSets.DEFAULT[0].action(ctx);
    expect(ctx.hand[PieceType.PAWN].quantity)
      .toBe(1 + RouletteSetsConfig.DEFAULT.increasedQuantity);

    /* -- x2 -- */
    RouletteSets.DEFAULT[1].action(ctx);
    expect(ctx.activePiece.quantity).toBe(2);

    /* -- +10 -- */
    RouletteSets.DEFAULT[2].action(ctx);
    expect(ctx.activePiece.quantity).toBe(12);

    /* -- -10 -- */
    RouletteSets.DEFAULT[3].action(ctx);
    expect(ctx.activePiece.quantity).toBe(2);

    /* -- Increase arrow speed -- */
    RouletteSets.DEFAULT[4].action(ctx);
    expect(ctx.arrow.angularSpeed)
      .toBeCloseTo(ArrowDefaults.angularSpeed + RouletteSetsConfig.DEFAULT.increasedAngularSpeed);

    /* -- Increase balls speed -- */
    RouletteSets.DEFAULT[5].action(ctx);
    expect(ctx.board.ballSpeeds[1])
      .toBe(BoardDefaults.defaultSpeed + RouletteSetsConfig.DEFAULT.increasedSpeed);

    jest.spyOn(global.Math, 'random').mockRestore();
  });

  test('RouletteSets', () => {
    Object.values(RouletteSets).forEach((set) => {
      let probability = 0;
      for (let i = 0; i < set.length; i++) {
        probability += set[i].probability;
      }
      expect(probability).toBeCloseTo(1);
    });
  });

  test('RouletteSetsConfig-DEFAULT', () => {
    let probability = 0;
    for (let i = 0; i < RouletteSetsConfig.DEFAULT.piecesProbabilities.length; i++) {
      probability += RouletteSetsConfig.DEFAULT.piecesProbabilities[i].probability;
    }
    expect(probability).toBeCloseTo(1);
  });

  test('getOption', () => {
    const roulette = new Roulette(RouletteSets.DEFAULT);

    let mockRandomNumber = 0;
    jest.spyOn(global.Math, 'random').mockReturnValue(mockRandomNumber);
    expect(roulette.getOption()).toBe(0);

    mockRandomNumber += roulette.options[0].probability;
    jest.spyOn(global.Math, 'random').mockReturnValue(mockRandomNumber);
    expect(roulette.getOption()).toBe(1);

    mockRandomNumber += roulette.options[1].probability;
    jest.spyOn(global.Math, 'random').mockReturnValue(mockRandomNumber);
    expect(roulette.getOption()).toBe(2);

    mockRandomNumber += roulette.options[2].probability;
    jest.spyOn(global.Math, 'random').mockReturnValue(mockRandomNumber);
    expect(roulette.getOption()).toBe(3);

    mockRandomNumber += roulette.options[3].probability;
    jest.spyOn(global.Math, 'random').mockReturnValue(mockRandomNumber);
    expect(roulette.getOption()).toBe(4);

    mockRandomNumber += roulette.options[4].probability;
    jest.spyOn(global.Math, 'random').mockReturnValue(mockRandomNumber);
    expect(roulette.getOption()).toBe(5);
  });
});
