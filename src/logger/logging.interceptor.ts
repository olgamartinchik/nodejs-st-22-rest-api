import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable} from "rxjs";
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor{
    constructor() {}
    intercept(ctx:ExecutionContext, next:CallHandler):Observable<void>{
        const [req, res] = ctx.getArgs();
        const { method, url, query, body } = req;
        const { statusCode } = res;
        const now = Date.now();


        return next
        .handle()
        .pipe(
            tap(()=>Logger.log(`${method} ${url} ${query} ${body} ${statusCode} responseTime: ${Date.now() - now}ms, ${ctx.getClass().name}`))
        )
        
    }
} 

