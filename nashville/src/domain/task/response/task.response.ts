import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

/*
Example: 
[
    {
        "id": "d470cdc2-f8d8-45ea-a45d-7a030845f7c8",
        "parentId": "e4259681-446f-42a9-8b40-ebda654dc88e",
        "title": "MyTask",
        "description": "Write code for computer programs and mobile applications",
        "createdAt": 2023-01-17T16:45:30,
        "updatedAt": 2023-01-17T17:30:25,
    },
] 
*/

@Exclude()
export class TaskResponse {
  /**
   * Task's id
   */
  @Expose()
  @Type(() => String)
  @ApiProperty({
    type: String,
    example: 'd470cdc2-f8d8-45ea-a45d-7a030845f7c8',
  })
  id: string;

  /**
   * Task's parent id
   */
  @Expose()
  @Type(() => String)
  @ApiProperty({
    type: String,
    example: 'e4259681-446f-42a9-8b40-ebda654dc88e',
  })
  parentId: string;

  /**
   * Task's title
   */
  @Expose()
  @Type(() => String)
  @ApiProperty({ type: String, example: 'MyTask' })
  title: string;

  /**
   * Task's description
   */
  @Expose()
  @Type(() => String)
  @ApiProperty({
    type: String,
    example: 'Write code for computer programs and mobile applications',
  })
  description: string;

  /**
   * Task's creation time
   */
  @Expose()
  @Type(() => Date)
  @ApiProperty({
    type: Date,
    example: '2023-01-17T16:45:30',
  })
  createdAt: Date;

  /**
   * Task's updated time
   */
  @Expose()
  @Type(() => Date)
  @ApiProperty({
    type: Date,
    example: '2023-01-17T17:30:25',
  })
  updatedAt: Date;
}
