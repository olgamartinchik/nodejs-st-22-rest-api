import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request=ctx.getRequest<Request>()
    const response = ctx.getResponse<Response>();
    const status = (exception as HttpException).getStatus();
    const message = exception.message;

   
      
    const errorResponse={
    
        statusCode: status,
        name:exception.name,
        timestamp: new Date().toLocaleDateString(),        
        path:request.url,
        method:request.method,
        message,
      
    }

    Logger.error(
      `METHOD: ${request.method} PATH:${request.url}, ErrorResponse: ${JSON.stringify(errorResponse)}`,
       'ExceptionFilter'
    )

    response.status(status).json(errorResponse);
  }
}
