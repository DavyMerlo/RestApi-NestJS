import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NotFoundException, ValidationPipe } from "@nestjs/common";
import * as dotenv from 'dotenv';
import { InvalidCredentialsFilter } from "./utils/invalid-credentials.filter";
import { NotFoundExceptionFilter } from "./utils/not-found.filter";

dotenv.config();
if(!process.env.PORT){
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const httpAdapterHost = app.get(HttpAdapterHost);
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
    }));

    app.useGlobalFilters(
        new InvalidCredentialsFilter(httpAdapterHost),
        new NotFoundExceptionFilter(httpAdapterHost)),
    await app.listen(PORT);
}
bootstrap();
