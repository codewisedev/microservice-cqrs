import {
  AllowNull,
  Column,
  CreatedAt,
  Default,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';

@Table
export class Task extends Model {
  @IsUUID(4)
  @PrimaryKey
  @AllowNull(false)
  @Unique(true)
  @Column
  id: string;

  @Default(null)
  @Column
  parentId: string;

  @Column
  title: string;

  @Column
  description: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
