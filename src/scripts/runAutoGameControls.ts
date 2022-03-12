import {io} from 'socket.io-client';
import chalk from 'chalk';
import gameTesterConfig from '../config/gameTesterConfig';
import sendRandomEvent from '../utils/autoTests';

const socket = io(`ws://localhost:${gameTesterConfig.port}`);

socket.on('connect', () => {
  console.log(chalk.dim('Client connected'));
  console.log(chalk.inverse.bold.blue('Auto Darkness tester'));
  setInterval(() => {
    const event = sendRandomEvent(socket);
    console.log(chalk.blue.dim(`Send event: ${event}`));
  }, gameTesterConfig.eventsDelay);
});
