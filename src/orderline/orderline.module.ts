import { Module } from '@nestjs/common';
import { OrderLineController } from './orderline.controller';
import { OrderLineService } from './orderline.service';
import { OrderLineRepository } from './orderline.repository';

@Module({
    controllers: [OrderLineController],
    providers: [
        OrderLineService, 
        OrderLineRepository]
})
export class OrderlineModule {}
