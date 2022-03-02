import readline from 'readline';
import Game from '../game/Game';
import {gameOverview} from '../utils/print';

const game = new Game([]);

game.start();
console.clear();

for (let i = 0; i < 1000; i++) {
  game.update();
  readline.cursorTo(process.stdout, 0, 0);
  console.log(gameOverview(game));
}
