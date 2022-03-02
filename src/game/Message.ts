import {MessageType} from './types';

export default class Message {
  content: string;

  type: MessageType;

  constructor(content: string, type = MessageType.INFO) {
    this.content = content;
    this.type = type;
  }
}
