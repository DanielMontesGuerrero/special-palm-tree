import KillReporter from './KillReporter';
import MessageManager from './MessageManager';
import Piece from './Piece';
import Roulette from './Roulette';
import {PieceType, ScoreType} from './types';

export default class Player {
  name: string;

  id: number;

  score: number;

  hand: Piece[];

  roulette: Roulette;

  messageManager: MessageManager;

  activePiece: Piece;

  killReporter: KillReporter;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
    this.hand = [
      new Piece(PieceType.KING),
      new Piece(PieceType.QUEEN),
      new Piece(PieceType.BISHOP),
      new Piece(PieceType.KNIGHT),
      new Piece(PieceType.ROOK),
      new Piece(PieceType.PAWN, 1, true),
    ];
    [,,,,, this.activePiece] = this.hand;
    this.score = 0;
    this.roulette = new Roulette();
    this.messageManager = new MessageManager(id);
    this.killReporter = new KillReporter();
  }

  changeActivePiece(index: number) {
    this.activePiece.isActive = false;
    this.activePiece = this.hand[index];
    this.activePiece.isActive = true;
  }

  updateScore(type: ScoreType, piece: Piece | null = null) {
    const getPiceValue = (pieceType: PieceType) => {
      switch (pieceType) {
        case PieceType.QUEEN: return 3;
        case PieceType.BISHOP: return 2;
        case PieceType.KNIGHT: return 2;
        case PieceType.ROOK: return 2;
        case PieceType.PAWN: return 1;
        default: return 0;
      }
    };
    const KILL_VALUE = 10000;
    switch (type) {
      case ScoreType.KILL:
        this.score += this.killReporter.unreportedKills * KILL_VALUE;
        this.killReporter.acknowledge();
        break;
      case ScoreType.PIECE_RELEASED:
        if (piece === null) {
          throw new Error('Missing piece argument');
        } else {
          this.score += piece.quantity * getPiceValue(piece.type);
        }
        break;
      default:
        break;
    }
  }
}
