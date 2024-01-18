import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderLineRepository } from './orderline.repository';
import { OrderLineDto } from './dto/orderline.dto';
import { orderLineMapper } from './mapper/orderline.mapper';

@Injectable()
export class OrderLineService {

    constructor(private orderLineRepository: OrderLineRepository){}

    async orderLines(){
        const orderLines = await this.orderLineRepository.orderLines();
        if(!orderLines || orderLines.length === 0) throw new NotFoundException('No orderlines found');
        const mappedOrderLines = orderLineMapper.mapOrderLine(orderLines);
        return mappedOrderLines;
    }

    async orderLineById(id: number){
        const orderLineDetail = await this.orderLineRepository.orderLineById(id);
        if(!orderLineDetail) throw new NotFoundException(`No orderline found wit Id: ${id}`);
        const mappedOrderLines = orderLineMapper.mapOrderLineDetail(orderLineDetail);
        return mappedOrderLines;
    }
    
    async addOrderLinesByOrderId(orderId: number, dto: OrderLineDto[]){
        await this.orderLineRepository.addOrderLinesByOrderId(orderId, dto);
    }

    async updateOrderLinesByOrderId(orderId: number, dto: OrderLineDto[]){
        await this.orderLineRepository.updateOrderLinesByOrderId(orderId, dto);
    }
}