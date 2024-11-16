import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ServerResponse } from '../interfaces';

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, ServerResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ServerResponse<T>> {
    const http = context.switchToHttp().getResponse();
    return next
      .handle()
      .pipe(map((data) => ({ data, statusCode: http.statusCode })));
  }
}
