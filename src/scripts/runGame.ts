import {Server} from 'socket.io';
import gameTesterConfig from '../config/gameTesterConfig';
import GameHandler from '../utils/GameHandler';
import OutputManager from '../utils/OutputManager';

const {port} = gameTesterConfig;
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
  outputManager.print(gameHandler.renderText());
}, gameTesterConfig.renderTime);

setInterval(() => {
  gameHandler.update();
}, gameTesterConfig.updateTime);
