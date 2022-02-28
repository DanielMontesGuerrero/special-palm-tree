import MessageManager from '../src/models/MessageManager';
import Piece from '../src/models/Piece';
import {PieceType} from '../src/models/types';

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
});
