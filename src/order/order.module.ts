import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { OrderlineModule } from '../orderline/orderline.module';
import { UserOrderModule } from '../user.order/user.order.module';
import { OrderLineService } from '../orderline/orderline.service';
import { UserOrderService } from '../user.order/user.order.service';
import { OrderLineRepository } from '../orderline/orderline.repository';
import { UserOrderRepository } from '../user.order/user.order.repository';

@Module({
  imports: [
    OrderlineModule, 
    UserOrderModule],
  controllers: [OrderController],
  providers: [
    OrderService, 
    OrderRepository,  
    OrderLineService, 
    OrderLineRepository,
    UserOrderService,
    UserOrderRepository]
})
export class OrderModule {}
