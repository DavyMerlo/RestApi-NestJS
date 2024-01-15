import { Module } from '@nestjs/common';
import { UserOrderController } from './user.order.controller';
import { UserOrderService } from './user.order.service';

@Module({
  controllers: [UserOrderController],
  providers: [UserOrderService]
})
export class UserOrderModule {}