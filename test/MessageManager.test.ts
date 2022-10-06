import {Config} from '../src/config/config';
import MessageManager from '../src/game/MessageManager';
import Piece from '../src/game/Piece';
import {MessageType, PieceType} from '../src/game/types';

describe('Message', () => {
  test('RouletteOptionSelected', () => {
    const manager = new MessageManager(0);
    manager.pushRouletteOptionSelectedMessage('x2');
    expect(manager.messages.length).toBe(1);
    expect(manager.messages[0].content).toMatch(/.*x2.*/);
  });

  test('PieceReleased', () => {
    const manager = new MessageManager(0);
    const piece = new Piece(PieceType.QUEEN, 5);
    manager.pushPieceReleasedMessage('player 1', piece);
    expect(manager.messages.length).toBe(1);
    expect(manager.messages[0].content).toMatch(/player 1.*5 Queens/);
  });

  test('aliveCells', () => {
    const manager = new MessageManager(0);
    manager.pushAliveCellsMessage(49, 100);
    expect(manager.messages.length).toBe(1);
    expect(manager.messages[0].content).toMatch(/.*49.*/);

    manager.pushAliveCellsMessage(40, 100);
    expect(manager.messages.length).toBe(1);

    manager.pushAliveCellsMessage(9, 100);
    expect(manager.messages.length).toBe(2);
    expect(manager.messages[1].content).toMatch(/.*9.*/);

    manager.pushAliveCellsMessage(7, 100);
    expect(manager.messages.length).toBe(2);
  });

  test('deadPlayer', () => {
    const manager = new MessageManager(0);
    manager.pushDeadPlayerMessage(2, 'Player 2');
    expect(manager.messages.length).toBe(1);
    expect(manager.messages[0].content).toMatch(/.*Player 2.*/);

    manager.pushDeadPlayerMessage(2, 'Player 2');
    expect(manager.messages.length).toBe(1);

    manager.pushDeadPlayerMessage(0, 'Player 1');
    expect(manager.messages.length).toBe(2);
    expect(manager.messages[1].content).toMatch(/You lose/);
  });

  test('startMessage', () => {
    const manager = new MessageManager(0);
    manager.pushStartMessage();
    expect(manager.messages.length).toBe(1);
    expect(manager.messages[0].content).toMatch(/.*start.*/);
  });

  test('winnerMessage', () => {
    const manager = new MessageManager(0);
    manager.pushWinnerMessage(1, 'Player 1');
    expect(manager.messages.length).toBe(1);
    expect(manager.messages[0].content).toMatch(/.*is the winner.*/);
    manager.pushWinnerMessage(0, 'Player 0');
    expect(manager.messages.length).toBe(2);
    expect(manager.messages[1].content).toMatch(/.*win.*/);
  });

  test('timeLimit', () => {
    const manager = new MessageManager(0);
    manager.pushTimeLimitMessage();
    expect(manager.messages.length).toBe(1);
    expect(manager.messages[0].content).toMatch(/.*Time limit exceeded.*/);
  });

  test('overrideRoulette', () => {
    const manager = new MessageManager(0);
    manager.pushOverrideRouletteAction('Take piece', 'x2', 'Too many pieces');
    expect(manager.messages.length).toBe(1);
    expect(manager.messages[0].content).toMatch(/.*ignored.*/);
  });

  test('messagePriority', async () => {
    const manager = new MessageManager(0);
    manager.pushPieceReleasedMessage('player 2', new Piece(PieceType.PAWN));
    manager.pushRouletteOptionSelectedMessage('option');

    // wait to push
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((_) => setTimeout(_, Config.messages.maxWaitTime.LOW));

    let message = manager.getNextMessage();
    expect(message).toBeDefined();
    if (message !== undefined) expect(message.type).toEqual(MessageType.WARNING);

    message = manager.getNextMessage();
    expect(message).toBeUndefined();

    // wait for next message
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((_) => setTimeout(_, Config.messages.maxWaitTime.LOW));
    message = manager.getNextMessage();
    expect(message).toBeDefined();
    if (message !== undefined) expect(message.type).toEqual(MessageType.INFO);
  });

  test('purgeMessages', () => {
    const manager = new MessageManager(0);
    manager.pushPieceReleasedMessage('', new Piece(PieceType.PAWN));
    manager.pushRouletteOptionSelectedMessage('');
    manager.pushDeadPlayerMessage(1, '');
    manager.pushDeadPlayerMessage(0, '');

    manager.purgeMessages([Config.messages.priorities.LOW, Config.messages.priorities.BASE]);
    expect(manager.messages.length).toEqual(2);
    expect(manager.messages[0].priority).toEqual(Config.messages.priorities.HIGH);
  });
});
