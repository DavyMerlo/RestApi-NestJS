import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger, NotFoundException } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { BaseComponent } from "../../models/components/base.component";


@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(NotFoundException.name);

    constructor(private httpAdapterhost: HttpAdapterHost){}

    catch(exception: NotFoundException, host: ArgumentsHost) {
        const {httpAdapter} = this.httpAdapterhost;
        const ctx = host.switchToHttp();
        const httpStatus = HttpStatus.NOT_FOUND;
        const id = exception.getResponse();
        this.logger.error(`Product with id: ${id} not found`);
        const message = id ? `Product with id: ${id} not found` : 'Products not found';
        const data = id? {} : []
        const responseBody: BaseComponent<{} | []> = {
            status_code: httpStatus,
            message,
            data
        };
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}