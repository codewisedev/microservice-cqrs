import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { Config } from '@common/config';

/* The RedisIoAdapter class is a TypeScript class that connects to a Redis server and creates a Redis
adapter for an iOS server. */
export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  /**
   * The function connects to a Redis server and creates a Redis adapter.
   */
  async connectToRedis(): Promise<void> {
    const pubClient = createClient({
      url: `${Config.redis.host}:${Config.redis.port}`,
    });
    const subClient = pubClient.duplicate();
    await Promise.all([pubClient.connect(), subClient.connect()]);
    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  /**
   * The function creates an IO server for iOS using the specified port and options.
   * @param {number} port - The `port` parameter is the port number on which the server will listen for
   * incoming connections. It is a number that specifies the port number, typically in the range of 0
   * to 65535.
   * @param {ServerOptions} [options] - The `options` parameter is an optional object that can contain
   * additional configuration options for the server. It can include properties such as `path` (the
   * path to the server), `serveClient` (whether to serve the client files), `pingInterval` (the
   * interval at which to send ping packets
   * @returns the created server object.
   */
  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}
