import { Injectable, Logger, NestMiddleware } from "@nestjs/common";

@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next:Function){
        Logger.log(`method: ${req.method}, path: ${req.url}` , 'LoggerMiddleware')

       
        next()

    }
}