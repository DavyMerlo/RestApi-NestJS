import { Catch, ArgumentsHost, HttpStatus, ExceptionFilter, Logger, NotAcceptableException } from '@nestjs/common';
import { ForbiddenException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { BaseComponent } from '../../models/components/base.component';
import { HttpAdapterHost } from '@nestjs/core';

type ErrorResponse = {
    message: string,
    error: string,
    statusCode: number
}

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(ForbiddenExceptionFilter.name);

    constructor(private httpAdapterHost: HttpAdapterHost) {}

    catch(exception: ForbiddenException, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const httpStatus = HttpStatus.FORBIDDEN;
        this.logger.error(`Forbidden exception: ${exception.message}`);
        const responseBody: BaseComponent<{}> = {
            status_code: httpStatus,
            message: 'Access Denied',
            data: {},
        };
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}

@Catch(UnauthorizedException)
export class InvalidCredentialsFilter implements ExceptionFilter {
    private readonly logger = new Logger(InvalidCredentialsFilter.name);

    constructor(private httpAdapterHost: HttpAdapterHost) {}

    catch(exception: UnauthorizedException, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const httpStatus = HttpStatus.UNAUTHORIZED;
        const response: string | object = exception.getResponse();

        const message = (typeof response === 'object' && 'message' in response) ? 
        (response as { message: string }).message : response;

        this.logger.error(`${response}`);
        const responseBody: BaseComponent<[]> = {
            status_code: httpStatus,
            message,
            data: [],
        };
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(NotFoundExceptionFilter.name);

    constructor(private httpAdapterhost: HttpAdapterHost) {}

    catch(exception: NotFoundException, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterhost;
        const ctx = host.switchToHttp();
        const httpStatus = HttpStatus.NOT_FOUND;
        const response: string | object = exception.getResponse();

        const message = (typeof response === 'object' && 'message' in response) ? 
        (response as { message: string }).message : response;

        this.logger.error(`${message}`);
        const data = response ? {} : [];
        const responseBody: BaseComponent<{} | []> = {
            status_code: httpStatus,
            message,
            data,
        };
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}

@Catch(NotAcceptableException)
export class NotAccaptableExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(NotAcceptableException.name);

    constructor(private httpAdapterhost: HttpAdapterHost) {}

    catch(exception: NotAcceptableException, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterhost;
        const ctx = host.switchToHttp();
        const httpStatus = HttpStatus.NOT_FOUND;
        const response: string | object = exception.getResponse();

        const message = (typeof response === 'object' && 'message' in response) ? 
        (response as { message: string }).message : response;

        this.logger.error(`${message}`);
        const data = response ? {} : [];
        const responseBody: BaseComponent<{} | []> = {
            status_code: httpStatus,
            message,
            data,
        };
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}

