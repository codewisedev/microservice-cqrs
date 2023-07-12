import { Injectable } from '@nestjs/common';
import { LogRepository } from '@domain/log/log.repository';

@Injectable()
export class LogService {
  constructor(private readonly logRepository: LogRepository) {}
}
