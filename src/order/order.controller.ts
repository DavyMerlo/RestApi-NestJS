import { OrderService } from './order.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { OrderDto } from './dto/order.dto';

@Controller('api/v1/orders')
export class OrderController {

    constructor(private orderService: OrderService){}

    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    orders() {
        return this.orderService.orders();
    }

    @Public()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    orderById(@Param('id') id: string){
        return this.orderService.ordersById(parseInt(id));
    }

    @Public()
    @Post()
    @HttpCode(HttpStatus.CREATED)
    addProduct(@Body() dto: OrderDto){
        console.log(dto)
        return this.orderService.addOrder(dto);
    }
}
