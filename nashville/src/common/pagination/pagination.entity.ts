import { ApiProperty } from '@nestjs/swagger';
import {
  ClassConstructor,
  Exclude,
  Expose,
  Type,
  plainToInstance,
} from 'class-transformer';

/**
 * The function transforms paginated data into a paginated response with the specified class
 * constructor.
 * @param cls - The `cls` parameter is a class constructor that represents the type of objects
 * contained in the paginated data. It is used to convert the plain data objects into instances of the
 * specified class.
 * @param paginatedData - The `paginatedData` parameter is an object that represents paginated data. It
 * contains two properties:
 * @returns a `PaginatedResponse<T>` object.
 */
export function transformPaginated<T, V>(
  cls: ClassConstructor<T>,
  paginatedData: PaginatedEntity<V>,
): PaginatedResponse<T> {
  const result = plainToInstance(PaginatedResponse<T>, paginatedData);
  result.items = plainToInstance(cls, paginatedData.items);
  return result;
}

/* It's a class that represents a paginated response */
@Exclude()
export class PaginatedResponse<ItemType> {
  /**
   * Data
   */
  @Expose()
  items: ItemType[];

  /**
   * Total document count
   */
  @Expose()
  @Type(() => Number)
  @ApiProperty({ type: Number })
  total: number;
}

/* The `PaginatedEntity` class is a generic class that represents a paginated list of items with a
total count. */
export class PaginatedEntity<ItemType> {
  items: ItemType[];
  total: number;
}
