import {Module} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards/at.guard';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot({isGlobal:true}), AuthModule, ProductModule, PrismaModule, SubcategoryModule, CategoryModule],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AtGuard
        },
    ],
})
export class AppModule {}