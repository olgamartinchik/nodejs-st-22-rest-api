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
    const status = exception.getStatus();
    const message = exception.message;

    const errorResponse={
      
        statusCode: status,
        timestamp: new Date().toLocaleDateString(),
        message,
      
    }

    Logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(errorResponse)
    )

    response.status(status).json(errorResponse);
  }
}
