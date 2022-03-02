// eslint-disable-next-line import/no-extraneous-dependencies
import chalk from 'chalk';
import Game from '../game/Game';
import Board from '../game/Board';
import Player from '../game/Player';
import Piece from '../game/Piece';
import {PieceType} from '../game/types';

type ListElement = string | number | boolean | Player | Piece;

function keyValueText(key: string, value: string | number | boolean) {
  return `${chalk.blue.italic(`${key}`)}: ${chalk.dim(value)}`;
}

function formattedList<T>(
  name: string,
  list: T[],
  transform: (item: T) => string,
) {
  let listText = `${chalk.blue.italic(name)}:\n`;
  list.forEach((item) => {
    listText += `\t${transform(item)}\n`;
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

export function gameOverview(game: Game) {
  const scores = game.players
    .sort((a, b) => a.score - b.score);
  const texts = [];
  texts.push(chalk.bold.inverse.yellow('Game'));
  texts.push(keyValueText('Game time', `${game.getRunningTime()}ms`));
  texts.push(keyValueText('Alive players', inlineList(game.board.getAlivePlayers())));
  texts.push(formattedList('Scores', scores, (player: Player) => `${chalk.cyan(player.name)}: ${player.score}`));
  return texts.join('\n');
}

export function boardOverview(board: Board) {
  const matrix: string[] = [];
  board.matrix.matrix.forEach((row) => {
    const textRow: string[] = [];
    row.forEach((cell) => {
      let health = '';
      if (cell.health >= 60) {
        health = chalk.inverse.green(' ');
      } else if (cell.health >= 30) {
        health = chalk.inverse.yellow(' ');
      } else if (cell.health > 0) {
        health = chalk.inverse.red(' ');
      } else {
        health = chalk.inverse.black(' ');
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
