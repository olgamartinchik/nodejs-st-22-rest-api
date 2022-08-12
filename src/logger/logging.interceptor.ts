import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable} from "rxjs";
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor{
    constructor() {}
    intercept(ctx:ExecutionContext, next:CallHandler):Observable<void>{
        const context = ctx.switchToHttp();
        const request=context.getRequest<Request>()
        const method=request.method
        const url  = request.url
        const now = Date.now();


        return next
        .handle()
        .pipe(
            tap(()=>Logger.log(`${method} ${url}  responseTime: ${Date.now() - now}ms`, ctx.getClass().name))
        )
        
    }
} 

