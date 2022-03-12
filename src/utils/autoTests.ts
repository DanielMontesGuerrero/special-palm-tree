import {Socket} from 'socket.io-client';
import {EventCode} from '../game/types';

function sendRandomChangeActivePiece(socket: Socket) {
  socket.emit('gameEvent', {
    code: EventCode.CHANGED_ACTIVE_PIECE,
    playerId: Math.floor(4 * Math.random()),
    newActivePiece: Math.floor(6 * Math.random()),
  });
}

function sendRandomTriggerRoulette(socket: Socket) {
  socket.emit('gameEvent', {
    code: EventCode.TRIGGERED_ROULETTE,
    playerId: Math.floor(4 * Math.random()),
    triggeredAt: Date.now(),
  });
}

function sendRandomReleasePiece(socket: Socket) {
  socket.emit('gameEvent', {
    code: EventCode.RELEASED_PIECE,
    playerId: Math.floor(4 * Math.random()),
    pieceType: Math.floor(6 * Math.random()),
  });
}

export default function sendRandomEvent(socket: Socket) {
  const option = Math.floor(3 * Math.random());
  switch (option) {
    case 0:
      sendRandomChangeActivePiece(socket);
      return 'ChangeActivePiece';
    case 1:
      sendRandomReleasePiece(socket);
      return 'ReleasePiece';
    case 2:
      sendRandomTriggerRoulette(socket);
      return 'TriggerRoulette';
    default:
      return 'No event';
  }
}
