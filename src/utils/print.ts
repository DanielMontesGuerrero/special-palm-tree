// eslint-disable-next-line import/no-extraneous-dependencies
import chalk from 'chalk';
import Game from '../game/Game';
import Board from '../game/Board';
import Player from '../game/Player';
import Piece from '../game/Piece';
import {GamePhase, PieceType} from '../game/types';
import Message from '../game/Message';

type ListElement = string | number | boolean | Player | Piece;

function keyValueText(key: string, value: string | number | boolean) {
  return `${chalk.blue.italic(`${key}`)}: ${chalk.dim(value)}`;
}

function formattedList<T>(
  name: string,
  list: T[],
  transform: (item: T) => string,
  limit: number | null = null,
) {
  let listText = `${chalk.blue.italic(name)}:\n`;
  list.forEach((item, index) => {
    if ((limit && index < limit) || limit === null) {
      listText += `\t${transform(item)}\n`;
    }
  });
  return listText;
}

function inlineList(list: ListElement[]) {
  const listText: string[] = [];
  list.forEach((item) => {
    listText.push(item.toString());
  });
  return chalk.yellow('[') + listText.join(', ') + chalk.yellow(']');
}

function nameFromType(type: PieceType) {
  switch (type) {
    case PieceType.KING: return 'King';
    case PieceType.QUEEN: return 'Queen';
    case PieceType.BISHOP: return 'Bishop';
    case PieceType.KNIGHT: return 'Knight';
    case PieceType.ROOK: return 'Rook';
    case PieceType.PAWN: return 'Pawn';
    default: return '';
  }
}

function getPhaseName(phase: GamePhase) {
  switch (phase) {
    case GamePhase.IDLE: return 'IDLE';
    case GamePhase.RUNNING: return 'RUNNING';
    case GamePhase.FINISHED: return 'FINISHED';
    default: return '';
  }
}

export function gameOverview(game: Game) {
  const scores = game.players
    .sort((a, b) => b.score - a.score);
  const texts = [];
  let gameTime = 'Not running';
  if (game.phase !== GamePhase.IDLE) {
    gameTime = `${game.getRunningTime()}ms`;
  }
  texts.push(chalk.bold.inverse.yellow('Game'));
  texts.push(keyValueText('Phase', getPhaseName(game.phase)));
  texts.push(keyValueText('Game time', gameTime));
  if (game.phase === GamePhase.FINISHED) {
    texts.push(keyValueText('Winner', game.players[game.getWinner()].name));
  } else {
    texts.push(keyValueText('Alive players', inlineList(game.board.getAlivePlayers())));
  }
  texts.push(formattedList('Scores', scores, (player: Player) => `${chalk.cyan(player.name)}: ${player.score}`));
  return texts.join('\n');
}

export function ballsOverview(board: Board) {
  const matrix = new Array<string[]>(board.matrix.rows + 2);
  let matrixText = '';
  const ballChar = '*';
  const getCellFromPlayerId = (playerId: number) => {
    switch (playerId) {
      case 0: return chalk.green(ballChar);
      case 1: return chalk.yellow(ballChar);
      case 2: return chalk.blue(ballChar);
      case 3: return chalk.red(ballChar);
      default: return chalk.inverse.white(ballChar);
    }
  };
  const setCell = (i: number, j: number, playerId: number) => {
    if (matrix[i][j] === chalk(' ')) {
      matrix[i][j] = getCellFromPlayerId(playerId);
    } else {
      matrix[i][j] = chalk.white(ballChar);
    }
  };
  for (let i = 0; i < board.matrix.rows; i++) {
    matrix[i + 1] = new Array<string>(board.matrix.cols + 2);
    for (let j = 0; j < board.matrix.cols; j++) {
      matrix[i + 1][j + 1] = chalk(' ');
    }
  }
  matrix[0] = new Array<string>(board.matrix.cols + 2);
  matrix[matrix.length - 1] = new Array<string>(board.matrix.cols + 2);
  for (let i = 0; i < matrix.length; i++) {
    matrix[i][0] = chalk.inverse.gray(' ');
    matrix[i][matrix[0].length - 1] = chalk.inverse.gray(' ');
  }
  for (let i = 0; i < matrix[0].length; i++) {
    matrix[0][i] = chalk.inverse.gray(' ');
    matrix[matrix.length - 1][i] = chalk.inverse.gray(' ');
  }
  board.balls.forEach((playerBalls, index) => {
    playerBalls.forEach((ball) => {
      setCell(Math.floor(ball.position.y + 1), Math.floor(ball.position.x + 1), index);
    });
  });
  for (let i = 0; i < matrix.length; i++) {
    matrixText += matrix[i].join('');
    matrixText += '\n';
  }
  return chalk.bold.inverse.yellow('Board\n') + matrixText;
}

export function boardOverview(board: Board) {
  const matrix: string[] = [];
  const cellChar = ' ';
  board.matrix.matrix.forEach((row) => {
    const textRow: string[] = [];
    row.forEach((cell) => {
      let health = '';
      if (cell.health >= 60) {
        health = chalk.inverse.green(cellChar);
      } else if (cell.health >= 30) {
        health = chalk.inverse.yellow(cellChar);
      } else if (cell.health > 0) {
        health = chalk.inverse.red(cellChar);
      } else {
        health = chalk.inverse.black(cellChar);
      }
      textRow.push(health);
    });
    matrix.push(textRow.join(''));
  });
  return chalk.bold.inverse.yellow('Board\n') + matrix.join('\n');
}

export function pieceOverview(piece: Piece) {
  let text = chalk.bold.red(nameFromType(piece.type));
  if (piece.isActive) {
    text = chalk.inverse(text);
  }
  text = chalk(text, chalk.dim(`- ${piece.quantity}`));
  return text;
}

export function playerOverview(player: Player) {
  const texts = [];
  const hand = formattedList('hand', player.hand, (piece: Piece) => pieceOverview(piece));
  texts.push(chalk.bold.inverse.yellow('Player'));
  texts.push(keyValueText('name', player.name));
  texts.push(keyValueText('id', player.id));
  texts.push(keyValueText('score', player.score));
  texts.push(hand);
  return texts.join('\n');
}

export function messagesOverview(player: Player) {
  const texts = [];
  const messages = player.messageManager.messages.map((item) => item);
  messages.reverse();
  texts.push(chalk.bold.inverse.yellow('Player Messages'));
  texts.push(formattedList('Messages', messages, (message: Message) => {
    let text = message.content;
    const limit = 40;
    if (text.length > limit) {
      text = text.slice(0, limit);
      text += '...';
    }
    return text;
  }, 5));
  return texts.join('\n');
}
