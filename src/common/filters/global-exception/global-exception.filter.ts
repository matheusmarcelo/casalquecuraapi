import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Erro interno no servidor';

    // Se já é uma HttpException, mantém o status e mensagem
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message = typeof exceptionResponse === 'string'
        ? exceptionResponse
        : exceptionResponse;
    }
    // Se é um erro de validação do class-validator
    else if (exception.name === 'BadRequestException') {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    }
    // Outros erros
    else {
      message = exception.message || message;
    }

    // Log do erro
    this.logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify({
        statusCode: status,
        message,
        error: exception.name,
        stack: exception.stack,
      }),
    );

    // Resposta padronizada
    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
