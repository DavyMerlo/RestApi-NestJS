import { Catch, UnauthorizedException, ArgumentsHost, HttpStatus, ExceptionFilter, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(UnauthorizedException)
export class InvalidCredentialsFilter implements ExceptionFilter {
  private readonly logger = new Logger(InvalidCredentialsFilter.name);

  constructor(private httpAdapterHost: HttpAdapterHost) {}

  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus = HttpStatus.UNAUTHORIZED;
    this.logger.error(`Invalid credentials: ${exception.message}`);

    const responseBody = {
      statusCode: httpStatus,
      message: 'Invalid credentials',
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

