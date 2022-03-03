import {io} from 'socket.io-client';
import chalk from 'chalk';
import MainMenu from '../utils/GameTestControl';

const socket = io('ws://localhost:3000');

socket.on('connect', () => {
  console.log(chalk.dim('Client connected'));
  console.log(chalk.inverse.bold.blue('Darkness tester'));
  MainMenu.init(socket);
});
