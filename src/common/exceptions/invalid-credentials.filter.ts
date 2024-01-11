import { Catch, UnauthorizedException, ArgumentsHost, HttpStatus, ExceptionFilter, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { BaseComponent } from '../../models/components/base.component';

@Catch(UnauthorizedException)
export class InvalidCredentialsFilter implements ExceptionFilter {
  private readonly logger = new Logger(InvalidCredentialsFilter.name);

  constructor(private httpAdapterHost: HttpAdapterHost) {}

  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const httpStatus = HttpStatus.UNAUTHORIZED;
    this.logger.error(`Invalid credentials: ${exception.message}`);
    const responseBody : BaseComponent<[]> = {
        status_code: httpStatus,
        message: 'Invalid credentials',
        data: [],
    };
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

