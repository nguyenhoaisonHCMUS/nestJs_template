import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const message = exception instanceof HttpException ? exception.getResponse() : 'Internal server error';

    response.status(status).json({
        statusCode: status,
        message: typeof message === 'string' ? message : (message as any)?.message || 'Unexpected error occurred',
        timestamp: new Date().toISOString(),
        path: request.url,
    });
  }
}