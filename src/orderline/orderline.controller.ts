import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { OrderLineService } from './orderline.service';
import { Public } from '../common/decorators/public.decorator';

@Controller('api/v1/orderlines')
export class OrderLineController {

    constructor(private orderLineService: OrderLineService){}

    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    orderLines(){
        return this.orderLineService.orderLines();
    }

    @Public()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    orderLineById(@Param('id') id: string){
        return this.orderLineService.orderLineById(parseInt(id));
    }
}
