import {
  AllowNull,
  Column,
  CreatedAt,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table
export class Log extends Model {
  @IsUUID(4)
  @PrimaryKey
  @AllowNull(false)
  @Unique(true)
  @Column
  id: string;

  @Column
  taskId: string;

  @Column
  status: string;

  @CreatedAt
  @Column
  createdAt: Date;
}
