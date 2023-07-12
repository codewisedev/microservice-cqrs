import { Injectable } from '@nestjs/common';
import { Server } from 'ws';
import { WSEventTypes, WSEvents } from '@domain/general/event/enum';
import { TaskResponse } from '@app/domain/task/response';
import { EventGateway } from '@domain/general/event/event.gateway';

@Injectable()
export class EventService {
  constructor(private readonly eventGateway: EventGateway) {}

  /**
   * The ping function takes a server object as an argument and emits a ping event with a pong
   * argument.
   * @param {Server} server - The server that the event was emitted from.
   */
  ping(server: Server) {
    server.emit(WSEvents.PING_EVENT, 'pong');
  }

  /**
   * The function emits a WebSocket event with the data provided.
   * @param {TaskResponse[]} data - The data parameter is an array of TaskResponse objects.
   */
  getTask(data: TaskResponse[]) {
    this.eventGateway.server.emit(WSEvents.GET_TASK, data);
  }
}
