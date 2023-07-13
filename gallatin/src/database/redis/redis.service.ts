import { RedisService as Redis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisService {
  constructor(private readonly redisService: Redis) {}

  /**
   * This is an asynchronous function that sets a key-value pair in Redis with an optional time-to-live
   * (TTL) value.
   * @param {string} key - The key is a string that represents the name of the key in Redis where the
   * value will be stored. It is used to uniquely identify the value and retrieve it later.
   * @param {any} value - The value to be stored in the Redis database with the given key. It can be of
   * any data type, including strings, numbers, objects, arrays, etc.
   * @param {number} ttl - ttl stands for "time to live" and represents the amount of time in seconds
   * that the key-value pair should be stored in the Redis database before it expires and is
   * automatically deleted. In the code above, the default value for ttl is set to 60 * 60 * 24, which
   * is
   * @returns The `set` method is returning the result of the Redis `set` command, which is a Promise
   * that resolves to a string indicating the success or failure of the operation. The `await` keyword
   * is used to wait for the Promise to resolve before returning the result.
   */
  async set(key: string, value: any, ttl: number = 60 * 60 * 24) {
    return await this.redisService.getClient().set(key, value, 'EX', ttl);
  }

  /**
   * This is an asynchronous function that retrieves a value from a Redis database using a given key.
   * @param {string} key - The "key" parameter is a string that represents the key of the value to be
   * retrieved from the Redis database. In Redis, keys are used to identify and retrieve values stored
   * in the database.
   * @returns The `get` method is returning the value associated with the given `key` from the Redis
   * database. The value is obtained by calling the `get` method of the Redis client instance returned
   * by `this.redisService.getClient()`. The `await` keyword is used to wait for the Redis client to
   * return the value before returning it from the `get` method.
   */
  async get(key: string) {
    return await this.redisService.getClient().get(key);
  }

  /**
   * This is an asynchronous function that deletes a key from a Redis database using the Redis client.
   * @param {string} key - The "key" parameter is a string that represents the key of the data that
   * needs to be deleted from the Redis database.
   * @returns The `del` method is returning the result of the `del` command executed on the Redis
   * client. The result is a number representing the number of keys that were deleted. The `await`
   * keyword is used to wait for the result of the `del` command before returning it.
   */
  async del(key: string) {
    return await this.redisService.getClient().del(key);
  }

  /**
   * This function flushes all data from a Redis client.
   * @returns The `flush()` method is returning the result of calling the `flushall()` method on the
   * Redis client instance obtained from the `redisService`. The `flushall()` method is used to remove
   * all keys from all databases on the Redis server. The `await` keyword is used to wait for the
   * result of the `flushall()` method to be returned before returning it from the `flush()` method
   */
  async flush() {
    return await this.redisService.getClient().flushall();
  }

  /**
   * This function flushes the Redis database using an async/await approach in TypeScript.
   * @returns The `flushdb()` method is returning a Promise that resolves to the result of calling the
   * `flushdb()` method on the Redis client instance obtained from the `redisService`. The result of
   * calling `flushdb()` is a string indicating whether the operation was successful or not.
   */
  async flushdb() {
    return await this.redisService.getClient().flushdb();
  }

  /**
   * This function returns a list of keys matching a given pattern from a Redis client.
   * @param {string} pattern - The `pattern` parameter is a string that represents a pattern to match
   * against keys in a Redis database. The `keys` method returns an array of keys that match the
   * specified pattern. The pattern can contain special characters such as `*` (matches any string) and
   * `?` (matches any
   * @returns The `keys` method is returning a Promise that resolves to an array of strings
   * representing the keys matching the specified pattern in the Redis database. The `await` keyword is
   * used to wait for the Promise to resolve before returning the result.
   */
  async keys(pattern: string) {
    return await this.redisService.getClient().keys(pattern);
  }

  /**
   * This is an asynchronous function that returns the time-to-live (TTL) of a Redis key.
   * @param {string} key - The `key` parameter is a string that represents the key of the Redis
   * database for which we want to get the time-to-live (TTL) value. The TTL value represents the
   * remaining time until the key expires and is deleted from the database.
   * @returns The `ttl` (time to live) of the Redis key specified by the `key` parameter is being
   * returned. The `await` keyword is used to wait for the Redis client to return the result before
   * returning it from the function.
   */
  async ttl(key: string) {
    return await this.redisService.getClient().ttl(key);
  }

  /**
   * This function checks if a key exists in a Redis database using an asynchronous approach in
   * TypeScript.
   * @param {string} key - The `key` parameter is a string that represents the key to check for
   * existence in the Redis database. The `exists` method checks if the key exists in the database and
   * returns a boolean value indicating whether the key exists or not.
   * @returns The `exists` method is returning a Promise that resolves to a boolean value indicating
   * whether the specified key exists in the Redis database or not. The `await` keyword is used to wait
   * for the Promise to resolve before returning the result.
   */
  async exists(key: string) {
    return await this.redisService.getClient().exists(key);
  }

  /**
   * This is an asynchronous function that increments the value of a key in a Redis database.
   * @param {string} key - The `key` parameter is a string that represents the name of the key in Redis
   * that we want to increment. The `incr` method is used to increment the value of the key by 1. If
   * the key does not exist, it will be initialized with a value of 0 before being
   * @returns The `incr` method is being called on the Redis client object obtained from the
   * `redisService`, with the `key` parameter passed as an argument. The `incr` method increments the
   * value stored at the specified key by 1 and returns the new value. The `async` keyword indicates
   * that the method returns a promise that resolves to the new value. Therefore, the `incr` method
   * returns
   */
  async incr(key: string) {
    return await this.redisService.getClient().incr(key);
  }

  /**
   * The function `decr` asynchronously decrements the value of a key in a Redis database.
   * @param {string} key - The `key` parameter is a string that represents the key of the value to be
   * decremented in the Redis database.
   * @returns The `decr` method is returning the result of the `decr` operation performed on the Redis
   * client with the given key.
   */
  async decr(key: string) {
    return await this.redisService.getClient().decr(key);
  }

  /**
   * This is an async function that sets a hash field with a value in Redis and returns a promise.
   * @param {string} key - The key is a string that represents the name of the hash in Redis where the
   * field-value pair will be stored.
   * @param {string} field - The field parameter is a string that represents the name of the field in
   * the hash. In Redis, a hash is a collection of key-value pairs where each key maps to a value. The
   * field parameter is used to specify the key in the hash where the value will be stored or updated.
   * @param {any} value - The value parameter is the value to be stored in the hash field.
   * @param {number} [ttl] - The `ttl` parameter is an optional parameter that represents the
   * time-to-live (in seconds) for the key-value pair being set in the Redis hash. If provided, Redis
   * will automatically expire the key-value pair after the specified number of seconds. If not
   * provided, the key-value pair will not expire
   * @returns The `hset` method is returning the result of the Redis command `hset(key, field, value)`.
   * The return value is not specified in the code snippet, but it is likely to be a number
   * representing the number of fields that were added or updated in the hash. The `await` keyword is
   * used to wait for the Redis command to complete before returning the result.
   */
  async hset(key: string, field: string, value: any, ttl?: number) {
    return await this.redisService.getClient().hset(key, field, value);
  }

  /**
   * This is an asynchronous function that retrieves a value from a Redis hash using a key and field.
   * @param {string} key - The key parameter is a string that represents the name of the hash in Redis
   * that we want to retrieve the value from.
   * @param {string} field - The field parameter is a string that represents the name of the field in a
   * Redis hash. The hget method retrieves the value associated with the specified field in the hash
   * stored at the specified key.
   * @returns A Promise that resolves to a string value retrieved from a Redis hash using the provided
   * key and field.
   */
  async hget(key: string, field: string): Promise<string> {
    return await this.redisService.getClient().hget(key, field);
  }

  /**
   * This is an async function that retrieves all the fields and values of a hash stored in Redis using
   * a given key.
   * @param {string} key - The key parameter is a string that represents the name of the hash in Redis
   * that we want to retrieve all the fields and values from.
   * @returns The `hgetall` method is returning a Promise that resolves to an object containing all the
   * fields and values of the hash stored at the specified `key` in Redis. The `await` keyword is used
   * to wait for the Promise to resolve before returning the result.
   */
  async hgetall(key: string) {
    return await this.redisService.getClient().hgetall(key);
  }

  /**
   * This function deletes a field from a hash in Redis.
   * @param {string} key - The key is a string that represents the name of the hash in Redis that we
   * want to delete a field from.
   * @param {string} field - The `field` parameter is a string representing the name of the field to be
   * deleted from the hash stored at the `key` parameter in Redis. In Redis, hashes are key-value pairs
   * where the key is a string and the value is a collection of field-value pairs. The `hdel`
   */
  async hdel(key: string, field: string) {
    await this.redisService.getClient().hdel(key, field);
  }

  /**
   * This function returns the number of fields in a hash stored at a given key in Redis.
   * @param {string} key - The `key` parameter is a string that represents the name of the Redis hash
   * data structure whose length is being retrieved.
   * @returns The `hlen` method is returning the length of the hash stored at the specified `key` in
   * Redis database. The method is using the Redis client provided by `redisService` to execute the
   * `hlen` command asynchronously and returning the result.
   */
  async hlen(key: string) {
    return await this.redisService.getClient().hlen(key);
  }

  /**
   * This function retrieves all the keys of a hash stored in a Redis database using an async/await
   * approach in TypeScript.
   * @param {string} key - The `key` parameter is a string that represents the name of the hash in
   * Redis that we want to retrieve the keys from.
   * @returns The `hkeys` method is returning a Promise that resolves to an array of all the field
   * names in the hash stored at the given `key` in Redis. The `await` keyword is used to wait for the
   * Promise to resolve before returning the result.
   */
  async hkeys(key: string) {
    return await this.redisService.getClient().hkeys(key);
  }

  /**
   * This is an async function that returns all values of a hash stored in Redis.
   * @param {string} key - The `key` parameter is a string that represents the name of the hash in
   * Redis from which to retrieve all the values.
   * @returns The `hvals` method is returning a Promise that resolves to an array of all the values in
   * the hash stored at the specified `key` in Redis. The `await` keyword is used to wait for the
   * Promise to resolve before returning the result.
   */
  async hvals(key: string) {
    return await this.redisService.getClient().hvals(key);
  }

  /**
   * This is an asynchronous function that checks if a field exists in a hash stored in Redis.
   * @param {string} key - The key parameter is a string that represents the name of the hash in Redis
   * that we want to check for the existence of a field.
   * @param {string} field - The `field` parameter is a string representing the name of the field in a
   * Redis hash. The `hExists` function checks if the specified field exists in the hash associated
   * with the given key.
   * @returns The `hExists` function is returning a promise that resolves to a boolean value indicating
   * whether the specified field exists in the hash stored at the specified key in Redis. The `await`
   * keyword is used to wait for the promise to resolve before returning the boolean value.
   */
  async hExists(key: string, field: string) {
    return await this.redisService.getClient().hexists(key, field);
  }
}
