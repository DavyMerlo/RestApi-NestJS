import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderLineRepository } from './orderline.repository';
import { OrderLineDto } from './dto/orderline.dto';

@Injectable()
export class OrderLineService {

    constructor(private orderLineRepository: OrderLineRepository){}

    async orderLines(){
        const orderLines = await this.orderLineRepository.orderLines();
        if(!orderLines || orderLines.length === 0) throw new NotFoundException('No orderlines found');
        return orderLines;
    }

    async orderLineById(id: number){
        const orderLineDetail = await this.orderLineRepository.orderLineById(id);
        if(!orderLineDetail) throw new NotFoundException(`No orderline found wit Id: ${id}`);
        return orderLineDetail;
    }
    
    async addOrderLinesByOrderId(orderId: number, dto: OrderLineDto[]){
        await this.orderLineRepository.addOrderLinesByOrderId(orderId, dto);
    }

    async updateOrderLinesByOrderId(orderId: number, dto: OrderLineDto[]){
        await this.orderLineRepository.updateOrderLinesByOrderId(orderId, dto);
    }
}