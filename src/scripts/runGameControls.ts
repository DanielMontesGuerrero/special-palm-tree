import {io} from 'socket.io-client';
import chalk from 'chalk';
import MainMenu from '../utils/GameTestControl';
import gameTesterConfig from '../config/gameTesterConfig';

const socket = io(`ws://localhost:${gameTesterConfig.port}`);

socket.on('connect', () => {
  console.log(chalk.dim('Client connected'));
  console.log(chalk.inverse.bold.blue('Darkness tester'));
  MainMenu.init(socket);
});
