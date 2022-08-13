import { Injectable, Logger, NestMiddleware } from "@nestjs/common";

const safeJsonStringify = require('safe-json-stringify');
@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    use(req:Request, res: Response, next:Function){
              

        Logger.log(`METHOD: ${req.method}, PATH: ${req.url}, PARAMS: ${JSON.stringify((req as any).params)}, HEADERS: ${JSON.stringify(req.headers)} ` , 'LoggerMiddleware')
       
        // too long log, you can uncomment


        //    const request=safeJsonStringify(req, null, 2)
        //    const response=safeJsonStringify(res, null, 2)

        //    Logger.debug(`response:${response}, request:${request} `, 'LoggerMiddleware')

        next()

    }
}

