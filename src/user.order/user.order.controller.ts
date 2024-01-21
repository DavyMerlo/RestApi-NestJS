import { UserOrderService } from './user.order.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';

@Controller('api/v1/users-orders')
export class UserOrderController {

    constructor(private userOrderService: UserOrderService){}

    @Public()
    @Get('users/:userId/orders')
    @HttpCode(HttpStatus.OK)
    async ordersByUserId(@Param('userId') userId: string) {
        return await this.userOrderService.ordersByUserId(parseInt(userId));
    }

    @Public()
    @Get('orders/:orderId/user')
    @HttpCode(HttpStatus.OK)
    async orderByOrderId(@Param('orderId') orderId: string) {
        return await this.userOrderService.userByOrderId(parseInt(orderId));
    }
}
