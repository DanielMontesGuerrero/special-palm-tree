import readline from 'readline';

export default class OutputManager {
  lastX: number;

  lastY: number;

  constructor() {
    this.lastX = 0;
    this.lastY = 0;
  }

  print(output: string) {
    readline.moveCursor(process.stdout, -this.lastX, -this.lastY);
    readline.clearScreenDown(process.stdout);
    console.log(output);
    this.lastY = (output.match(/\n/g) || []).length + 1;
    this.lastX = (output.split('\n').at(-1) || '').length + 1;
  }
}
