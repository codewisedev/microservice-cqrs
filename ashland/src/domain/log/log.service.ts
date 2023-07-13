import { Injectable } from '@nestjs/common';
import { LogRepository } from '@domain/log/log.repository';

@Injectable()
export class LogService {
  constructor(private readonly logRepository: LogRepository) {}

  /**
   * The createLog function creates a log entry using the provided body.
   * @param body - The `body` parameter is an object that contains the data to be logged. It could
   * include information such as the log message, timestamp, severity level, and any additional
   * metadata related to the log entry.
   */
  createLog(body) {
    this.logRepository.create(body);
  }
}
