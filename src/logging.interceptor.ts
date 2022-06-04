import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const { url, method } = context.getArgByIndex(0);
    const { statusCode } = context.getArgByIndex(1);

    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(
            `${url} | ${method} | RES:${statusCode} | ${Date.now() - now}ms`,
          ),
        ),
      );
  }
}
