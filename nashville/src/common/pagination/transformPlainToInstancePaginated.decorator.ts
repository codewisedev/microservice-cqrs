import { ClassConstructor } from 'class-transformer';
import { PaginatedResponse, transformPaginated } from '@common/pagination';

/**
 * The function `TransformPlainToInstancePaginated` is a TypeScript decorator that transforms plain
 * data into instances of a specified class and returns a paginated response.
 * @param cls - The `cls` parameter is the class constructor for the type of object you want to
 * transform the plain data into. It is used to create instances of that class from the plain data.
 * @returns The method decorator is returning a modified version of the original method. The modified
 * method takes in any number of arguments and returns a Promise of type `PaginatedResponse<T>`.
 */
export const TransformPlainToInstancePaginated = <T>(
  cls: ClassConstructor<T>,
): MethodDecorator => {
  return function (
    target: Record<string, unknown>,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ): void {
    const originalMethod = descriptor.value;
    descriptor.value = async function (
      ...args: unknown[]
    ): Promise<PaginatedResponse<T>> {
      const paginatedData = await originalMethod.apply(this, args);
      return transformPaginated(cls, paginatedData);
    };
  };
};
