import { Module } from '@nestjs/common';
import { UserOrderController } from './user.order.controller';
import { UserOrderService } from './user.order.service';
import { UserOrderRepository } from './user.order.repository';

@Module({
  controllers: [UserOrderController],
  providers: [
    UserOrderService, 
    UserOrderRepository
  ]
})
export class UserOrderModule {}
