export default class Event {
  code: number;

  params: any;

  action: () => void;

  constructor(event: Event) {
    this.code = event.code;
    this.params = event.params;
    this.action = event.action;
  }
}
