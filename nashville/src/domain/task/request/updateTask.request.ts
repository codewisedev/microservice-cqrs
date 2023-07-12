import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsDefined, IsNotEmpty } from 'class-validator';

export class UpdateTaskRequest {
  /**
   * Task's title
   */
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  @ApiProperty({
    type: String,
    example: 'MyTask',
  })
  title: string;

  /**
   * Task's description
   */
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  @ApiProperty({
    type: String,
    example: 'Write code for computer programs and mobile applications',
  })
  description: string;
}
