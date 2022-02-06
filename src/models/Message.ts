export enum MessageType {
    INFO,
    WIN,
    LOOSE,
    WARNING,
}

export default class Message {
  content: string;

  type: MessageType;

  constructor(message: Message) {
    this.content = message.content;
    this.type = message.type;
  }
}
