import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsDefined,
  IsNotEmpty,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateTaskRequest {
  /**
   * Task's parent id
   */
  @IsOptional()
  @IsUUID('4')
  @Type(() => String)
  @ApiProperty({
    type: String,
    example: 'd9405fa5-02bd-4d48-9a8f-7597d72a4237',
  })
  parentId?: string;

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
