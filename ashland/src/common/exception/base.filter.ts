import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

/* The AllExceptionsFilter class is a filter for handling exceptions in a TypeScript application. */
@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let errors: {
      messages: string[];
      field?: string;
    }[] = [];

    if (exception?.response?.statusCode === HttpStatus.BAD_REQUEST) {
      const messages: any = exception.response.message;

      /* This code block is checking the type of the `messages` variable and creating an array of error
      messages based on its type. */
      if (typeof messages == 'object' && !Array.isArray(messages)) {
        // get the keys of record of messages
        const keys = Object.keys(messages);

        // iterate over messages and get the messages
        keys.forEach((key: string) => {
          errors.push({
            messages: messages[key] as string[],
            field: key,
          });
        });
      } else if (Array.isArray(messages)) {
        for (const message of messages) {
          errors.push({
            field: message.substring(0, message.indexOf(' ')),
            messages: [message],
          });
        }
      } else {
        errors = [
          {
            messages: [messages],
          },
        ];
      }

      response.status(exception.response?.statusCode).json({
        data: null,
        statusCode: exception.response?.statusCode || HttpStatus.BAD_REQUEST,
        errors,
        message: 'Failed!!',
      });
    } else {
      errors.push({
        messages: [exception.message],
      });

      response
        .status(
          exception.response?.statusCode ||
            exception.status ||
            HttpStatus.INTERNAL_SERVER_ERROR,
        )
        .json({
          data: null,
          statusCode: exception?.status || HttpStatus.INTERNAL_SERVER_ERROR,
          errors: errors,
          message: 'Failed!!',
        });
    }
  }
}
