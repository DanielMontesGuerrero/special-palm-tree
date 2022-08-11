import {Config} from '../config/config';
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

  isDead: boolean;

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
    this.isDead = false;
  }

  setDead() {
    this.isDead = true;
  }

  changeActivePiece(type: PieceType) {
    if (this.hand[type].quantity === 0) return;
    this.activePiece.isActive = false;
    this.activePiece = this.hand[type];
    this.activePiece.isActive = true;
  }

  updateScore(type: ScoreType, piece: Piece | null = null, aliveCellsCount = 0) {
    const getPiceValue = (pieceType: PieceType) => {
      switch (pieceType) {
        case PieceType.QUEEN: return Config.score.pieceValue.QUEEN;
        case PieceType.BISHOP: return Config.score.pieceValue.BISHOP;
        case PieceType.KNIGHT: return Config.score.pieceValue.KNIGHT;
        case PieceType.ROOK: return Config.score.pieceValue.ROOK;
        case PieceType.PAWN: return Config.score.pieceValue.PAWN;
        default: return 0;
      }
    };
    switch (type) {
      case ScoreType.KILL:
        this.score += this.killReporter.unreportedKills * Config.score.killValue;
        this.killReporter.acknowledge();
        break;
      case ScoreType.PIECE_RELEASED:
        if (piece === null) {
          throw new Error('Missing piece argument');
        } else {
          this.score += piece.quantity * getPiceValue(piece.type);
        }
        break;
      case ScoreType.ALIVE_CELL:
        this.score += Config.score.aliveCellValue * aliveCellsCount;
        break;
      default:
        break;
    }
  }

  removePiece(type: PieceType) {
    this.hand[type].quantity = 1;
    if (type !== PieceType.PAWN) {
      this.changeActivePiece(PieceType.PAWN);
    }
  }
}
