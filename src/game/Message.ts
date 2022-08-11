import {MessageType} from './types';
import {Config} from '../config/config';

export default class Message {
  content: string;

  type: MessageType;

  priority: number;

  startedWatingAt: number;

  constructor(
    content: string,
    type = MessageType.INFO,
    priority = Config.messages.priorities.BASE,
  ) {
    this.content = content;
    this.type = type;
    this.priority = priority;
    this.startedWatingAt = 0;
  }

  setStartedWaitingAt(timestamp: number) {
    this.startedWatingAt = timestamp;
  }
}
