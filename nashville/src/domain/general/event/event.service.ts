import { Injectable } from '@nestjs/common';
import { Server } from 'ws';
import { WSEventTypes, WSEvents } from '@domain/general/event/enum';

@Injectable()
export class EventService {
  /**
   * The ping function takes a server object as an argument and emits a ping event with a pong
   * argument.
   * @param {Server} server - The server that the event was emitted from.
   */
  ping(server: Server) {
    server.emit(WSEvents.PING_EVENT, 'pong');
  }
}
