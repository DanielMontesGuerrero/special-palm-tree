import inquirer from 'inquirer';
import {Socket} from 'socket.io-client';
import {EventCode, PieceType} from '../game/types';
import OverviewType from './overviewType';

type ChangeViewAnswers = {
  option: string;
  playerId?: number;
};

const ChangeViewMenu = {
  questions: [
    {
      type: 'list',
      name: 'option',
      message: 'What do you want to see?',
      choices: [
        'Game',
        'Board',
        'Single player',
        'Balls',
        'Messages',
      ],
    },
    {
      type: 'list',
      name: 'playerId',
      message: 'What player do you want to see?',
      choices: [
        {
          name: 'Player 0',
          value: 0,
        },
        {
          name: 'Player 1',
          value: 1,
        },
        {
          name: 'Player 2',
          value: 2,
        },
        {
          name: 'Player 3',
          value: 3,
        },
      ],
      when(answers: ChangeViewAnswers) {
        return answers.option === 'Single player' || answers.option === 'Messages';
      },
    },
  ],
  handler(answers: ChangeViewAnswers, socket: Socket) {
    let type = OverviewType.GAME;
    switch (answers.option) {
      case 'Game':
        type = OverviewType.GAME;
        break;
      case 'Board':
        type = OverviewType.BOARD;
        break;
      case 'Players':
        type = OverviewType.PLAYERS;
        break;
      case 'Single player':
        type = OverviewType.PLAYER;
        break;
      case 'Balls':
        type = OverviewType.BALLS;
        break;
      case 'Messages':
        type = OverviewType.MESSAGES;
        break;
      default:
        break;
    }
    socket.emit('overview', type, {playerId: answers.playerId});
    MainMenu.init(socket);
  },
};

type TriggerRouletteAnswers = {
  playerId: number;
};

const TriggerRouletteMenu = {
  questions: [
    {
      type: 'list',
      name: 'playerId',
      message: 'PlayerId:',
      choices: [
        {
          name: 'Player 0',
          value: 0,
        },
        {
          name: 'Player 1',
          value: 1,
        },
        {
          name: 'Player 2',
          value: 2,
        },
        {
          name: 'Player 3',
          value: 3,
        },
      ],
    },
  ],
  handler(answers: TriggerRouletteAnswers, socket: Socket) {
    socket.emit('gameEvent', {
      code: EventCode.TRIGGERED_ROULETTE,
      playerId: answers.playerId,
      triggeredAt: Date.now(),
    });
    socket.emit('gameEvent', {
      code: EventCode.ACKNOWLEDGED_ROULETTE,
      playerId: answers.playerId,
    });
    MainMenu.init(socket);
  },
};

type ChangeActivePieceAnswers = {
  playerId: number;
  pieceType: PieceType;
};

const ChangeActivePieceMenu = {
  questions: [
    {
      type: 'list',
      name: 'playerId',
      message: 'PlayerId:',
      choices: [
        {
          name: 'Player 0',
          value: 0,
        },
        {
          name: 'Player 1',
          value: 1,
        },
        {
          name: 'Player 2',
          value: 2,
        },
        {
          name: 'Player 3',
          value: 3,
        },
      ],
    },
    {
      type: 'list',
      name: 'pieceType',
      message: 'New active piece:',
      choices: [
        {
          name: 'QUEEN',
          value: PieceType.QUEEN,
        },
        {
          name: 'BISHOP',
          value: PieceType.BISHOP,
        },
        {
          name: 'KNIGHT',
          value: PieceType.KNIGHT,
        },
        {
          name: 'ROOK',
          value: PieceType.ROOK,
        },
        {
          name: 'PAWN',
          value: PieceType.PAWN,
        },
      ],
    },
  ],
  handler(answers: ChangeActivePieceAnswers, socket: Socket) {
    socket.emit('gameEvent', {
      code: EventCode.CHANGED_ACTIVE_PIECE,
      playerId: answers.playerId,
      newActivePiece: answers.pieceType,
    });
    MainMenu.init(socket);
  },
};

type ReleasePieceAnswers = ChangeActivePieceAnswers;

const ReleasePieceMenu = {
  questions: ChangeActivePieceMenu.questions,
  handler(answers: ReleasePieceAnswers, socket: Socket) {
    socket.emit('gameEvent', {
      code: EventCode.RELEASED_PIECE,
      playerId: answers.playerId,
      pieceType: answers.pieceType,
    });
    MainMenu.init(socket);
  },
};

type SendEventAnswers = {
  option: string;
};

const SendEventMenu = {
  questions: [
    {
      type: 'list',
      name: 'option',
      message: 'What event do you want to send?',
      choices: [
        'TRIGGERED_ROULETTE',
        'RELEASED_PIECE',
        'CHANGED_ACTIVE_PIECE',
      ],
    },
  ],
  handler(answers: SendEventAnswers, socket: Socket) {
    switch (answers.option) {
      case 'TRIGGERED_ROULETTE':
        inquirer.prompt(TriggerRouletteMenu.questions)
          .then((ans: TriggerRouletteAnswers) => TriggerRouletteMenu.handler(ans, socket));
        break;
      case 'RELEASED_PIECE':
        inquirer.prompt(ReleasePieceMenu.questions)
          .then((ans: ReleasePieceAnswers) => ReleasePieceMenu.handler(ans, socket));
        break;
      case 'CHANGED_ACTIVE_PIECE':
        inquirer.prompt(ChangeActivePieceMenu.questions)
          .then((ans: ChangeActivePieceAnswers) => ChangeActivePieceMenu.handler(ans, socket));
        break;
      default:
        break;
    }
  },
};

type MainAnswers = {
  option: string;
};

const MainMenu = {
  questions: [
    {
      type: 'list',
      name: 'option',
      message: 'What do you wanna do?',
      choices: [
        'Start',
        'Change view',
        'Send event',
        'Stop',
      ],
    },
  ],
  handler(answers: MainAnswers, socket: Socket) {
    switch (answers.option) {
      case 'Start':
        socket.emit('start');
        this.init(socket);
        break;
      case 'Change view':
        inquirer.prompt(ChangeViewMenu.questions)
          .then((ans: ChangeViewAnswers) => ChangeViewMenu.handler(ans, socket));
        break;
      case 'Send event':
        inquirer.prompt(SendEventMenu.questions)
          .then((ans: SendEventAnswers) => SendEventMenu.handler(ans, socket));
        break;
      default:
        socket.emit('stop');
        this.init(socket);
        break;
    }
  },
  init(socket: Socket) {
    inquirer.prompt(this.questions).then((answers: MainAnswers) => this.handler(answers, socket));
  },
};

export default MainMenu;
