import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Log } from '@domain/log/models';

@Injectable()
export class LogRepository {
  constructor(
    @InjectModel(Log)
    private taskModel: typeof Log,
  ) {}
}
