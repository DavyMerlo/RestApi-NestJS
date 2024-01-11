import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from "@nestjs/common";
import {ConfigService} from '@nestjs/config'
import { Response } from "express";
import { timestamp } from "rxjs";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpException.name);

    constructor(private configService: ConfigService){}

    catch(exception: any, host: ArgumentsHost) {
        const ctx =  host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        
        const isProduction = 
        this.configService.get<string>('NODE_ENV') === 'production';

        this.logger.error(`Exception: ${exception.message}, status: ${status}`);

        response.status(status).json(
            isProduction ? {
                statusCode: status,
                timestamp: new Date().toISOString(),
                message: exception.message,
            }
            :
            {
                statusCode: status,
                timestamp: new Date().toISOString(),
                message: exception.message,
                stacktrace: exception.stack,
            }
        )
    }
}