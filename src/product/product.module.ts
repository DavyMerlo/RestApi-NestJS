import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { ProductV2Controller } from './productV2.controller';
import { ProductV1Controller } from './productV1.controller';

@Module({
  controllers: [
    ProductV1Controller, 
    ProductV2Controller
  ],
  providers: [
    ProductService, 
    ProductRepository
  ],
})
export class ProductModule {}
