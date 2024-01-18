import { OrderService } from './order.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { OrderDto } from './dto/order.dto';

@Controller('api/v1/orders')
export class OrderController {

    constructor(private orderService: OrderService){}

    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    async orders() {
        return await this.orderService.orders();
    }

    @Public()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async orderById(@Param('id') id: string){
        return await this.orderService.ordersById(parseInt(id));
    }

    @Public()
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addOrder(@Body() dto: OrderDto){
        return await this.orderService.addOrder(dto);
    }

    @Public()
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async updateOrder(@Param('id') id: string, @Body() dto: OrderDto){
        return await this.orderService.updateOrderById(parseInt(id), dto);
    }
}
