import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WSEvents } from '@domain/general/event/enum';
import { Config } from '@common/config';
import { TaskResponse } from '@app/domain/task/response';

@WebSocketGateway({
  transports: ['websocket'],
})
export class EventGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  /* A decorator that is used to inject the server object into the class. */
  @WebSocketServer()
  server: Server;

  /**
   * The `afterInit` function is called after the server has been initialized.
   * @param {Server} server - The "server" parameter is of type "Server". It is likely referring to an
   * instance of a server object that has been initialized or created elsewhere in the code.
   */
  afterInit(server: Server) {
    console.log('Websocket server started..!!');
  }

  /**
   * The function "handleConnection" logs the ID of a client socket when it connects.
   * @param {Socket} client - The parameter "client" is of type "Socket". It represents a connection
   * between the server and a client.
   */
  handleConnection(@ConnectedSocket() client: Socket) {
    // client.emit(WSEvents.ERROR_EVENT, new WsException(''));
    console.log(client.id);
  }

  /**
   * The function "handleDisconnect" disconnects a client socket.
   * @param {Socket} client - The `client` parameter is of type `Socket`, which represents a connection
   * between the server and a client.
   */
  handleDisconnect(client: Socket) {
    client.disconnect(true);
  }

  /**
   * The function `ping` emits a WebSocket event with the data received as a parameter and returns the
   * same data.
   * @param {string} data - The `data` parameter is of type `string` and represents the message that
   * will be sent as a ping event.
   * @returns The data variable is being returned.
   */
  @SubscribeMessage(WSEvents.PING_EVENT)
  async ping(@MessageBody() data: string) {
    this.server.emit(WSEvents.PING_EVENT, data);
    return data;
  }
}
