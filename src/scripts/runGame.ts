import {Server} from 'socket.io';
import GameHandler from '../utils/GameHandler';
import OutputManager from '../utils/OutputManager';

const port = 3000;
const io = new Server(port);
const gameHandler = new GameHandler();
const outputManager = new OutputManager();

io.on('connection', (socket) => {
  outputManager.print('Connected');
  socket.on('start', () => {
    gameHandler.start();
  });
  socket.on('stop', () => {
    gameHandler.stop();
  });
  socket.on('overview', (type, options) => {
    gameHandler.changeRenderConfig(type, options);
  });
  socket.on('gameEvent', (event) => {
    gameHandler.pushEvent(event);
  });
});

setInterval(() => {
  gameHandler.update();
  outputManager.print(gameHandler.renderText());
}, 200);
