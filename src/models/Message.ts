import {MessageType} from './types';

export default class Message {
  content: string;

  type: MessageType;

  constructor(message: Message) {
    this.content = message.content;
    this.type = message.type;
  }
}
