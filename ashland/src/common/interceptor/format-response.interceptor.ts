import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/* The FormatResponseInterceptor class is a NestJS interceptor that formats the response of an HTTP
request with a standardized structure. */
@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();

        /* This line of code is checking if the HTTP response status code is equal to the `CREATED`
        status code (201). If it is, then it sets the `data` variable to the string `'Created!!'`.
        This is likely used to provide a more descriptive message in the response payload when a
        resource has been successfully created. */
        if (response.statusCode === HttpStatus.CREATED) data = 'Created!!';

        return {
          data,
          statusCode: response.statusCode,
          errors: null,
          message: 'Success',
        };
      }),
    );
  }
}
