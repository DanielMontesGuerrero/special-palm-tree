import Message from './Message';
import Piece from './Piece';
import {MessageType, PieceType} from './types';
import {Config} from '../config/config';

const MessagePriority = Config.messages.priorities;

const getWaitTime = (message: Message | undefined) => {
  if (message === undefined) {
    return 0;
  }
  switch (message.priority) {
    case Config.messages.priorities.LOW:
      return Config.messages.maxWaitTime.LOW;
    case Config.messages.priorities.BASE:
      return Config.messages.maxWaitTime.BASE;
    case Config.messages.priorities.HIGH:
      return Config.messages.maxWaitTime.HIGH;
    case Config.messages.priorities.VERY_HIGH:
      return Config.messages.maxWaitTime.VERY_HIGH;
    default:
      return Config.messages.maxWaitTime.BASE;
  }
};

export default class MessageManager {
  messages: Message[];

  lastMessage?: Message;

  notifiedHalfCellsAlive = false;

  notifiedNineCellsAlive = false;

  notifiedDeadPlayer = [false, false, false, false];

  playerId: number;

  nextMessageWaitTime: number;

  constructor(playerId: number) {
    this.messages = [];
    this.playerId = playerId;
    this.nextMessageWaitTime = 0;
  }

  push(message: Message) {
    if (this.messages.length === 0) {
      message.setStartedWaitingAt(Date.now());
    }
    this.messages.push(message);
  }

  pushRouletteOptionSelectedMessage(optionName: string) {
    this.push(new Message(`New roulette effect: ${optionName}`));
  }

  pushPieceReleasedMessage(playerName: string, piece: Piece) {
    this.push(new Message(`${playerName} is releasing ${piece.quantity} `
      + `${MessageManager.getPieceName(piece)}`, MessageType.WARNING, MessagePriority.LOW));
  }

  pushAliveCellsMessage(aliveCells: number, totalCells: number) {
    let message = '';
    if (aliveCells < (totalCells / 2) && !this.notifiedHalfCellsAlive) {
      message = `Only ${aliveCells} cells alive!`;
      this.notifiedHalfCellsAlive = true;
      this.push(new Message(message, MessageType.WARNING, MessagePriority.HIGH));
    }
    if (aliveCells <= 9 && !this.notifiedNineCellsAlive) {
      message = `Only ${aliveCells} cells alive!`;
      this.notifiedNineCellsAlive = true;
      this.push(new Message(message, MessageType.WARNING, MessagePriority.HIGH));
    }
  }

  pushDeadPlayerMessage(deadPlayer: number, playerName: string) {
    if (!this.notifiedDeadPlayer[deadPlayer]) {
      if (deadPlayer === this.playerId) {
        this.push(new Message('You lose', MessageType.LOSE, MessagePriority.VERY_HIGH));
      } else {
        this.push(new Message(`${playerName} is dead`, MessageType.DEAD_PLAYER, MessagePriority.HIGH));
      }
      this.notifiedDeadPlayer[deadPlayer] = true;
    }
  }

  pushStartMessage() {
    this.push(new Message('Game started'));
  }

  pushWinnerMessage(winnerId: number, winnerName: string) {
    if (winnerId === this.playerId) {
      this.push(new Message('You win', MessageType.WIN, MessagePriority.VERY_HIGH));
    } else {
      this.push(new Message(`${winnerName} is the winner`, MessageType.WIN, MessagePriority.HIGH));
    }
  }

  pushTimeLimitMessage() {
    this.push(new Message('Time limit exceeded, who is the winner?'));
  }

  pushTiebreakerMessage(aliveCellsCount: number) {
    this.push(new Message(`You ended with ${aliveCellsCount} alive cells`));
  }

  pushOverrideRouletteAction(oldEffect: string, newEffect: string, reason: string) {
    this.push(new Message(`${oldEffect} ignored, new effect: ${newEffect} because ${reason}`, MessageType.INFO, MessagePriority.LOW));
  }

  static getPieceName(piece: Piece) {
    let name = '';
    switch (piece.type) {
      case PieceType.KING: name = 'King'; break;
      case PieceType.QUEEN: name = 'Queen'; break;
      case PieceType.BISHOP: name = 'Bishop'; break;
      case PieceType.KNIGHT: name = 'Knight'; break;
      case PieceType.ROOK: name = 'Rook'; break;
      case PieceType.PAWN: name = 'Pawn'; break;
      default: break;
    }
    if (piece.quantity > 1) {
      name += 's';
    }
    return name;
  }

  pop() {
    const message = this.messages.shift();
    if (this.messages[0] !== undefined) {
      this.messages[0].setStartedWaitingAt(Date.now());
    }
    return message;
  }

  purgeMessages(prioritiesToPurge: number[]) {
    this.messages = this.messages.filter((message) => {
      const foundPriority = prioritiesToPurge.find((priority) => priority === message.priority);
      return foundPriority === undefined;
    });
  }

  getNextMessage(): Message | undefined {
    let message = this.lastMessage;
    if (this.messages.length === 0) return message;
    const currentWaitTime = Date.now() - this.messages[0].startedWatingAt;
    if (this.messages.length > Config.messages.maxNumberOfMessagesInQueue) {
      this.purgeMessages([MessagePriority.LOW, MessagePriority.BASE]);
    }
    if (currentWaitTime > this.nextMessageWaitTime) {
      message = this.pop();
      this.nextMessageWaitTime = getWaitTime(message);
    }
    this.lastMessage = message;
    return message;
  }
}
