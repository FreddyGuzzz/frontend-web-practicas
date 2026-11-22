import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(contexto: ExecutionContext, siguiente: CallHandler): Observable<unknown> {
    const req = contexto.switchToHttp().getRequest<{ method: string; url: string }>();
    const inicio = Date.now();
    const retardo = Number(process.env.RETARDO_MS ?? 0);

    const flujo$ = retardo > 0 ? siguiente.handle().pipe(delay(retardo)) : siguiente.handle();

    return flujo$.pipe(
      tap(() => {
        const ms = Date.now() - inicio;
        this.logger.log(`${req.method} ${req.url} - ${ms}ms`);
      }),
    );
  }
}
