import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { orderMapper } from './mapper/order.mapper';
import { OrderDto } from './dto/order.dto';
import { OrderLineService } from '../orderline/orderline.service';
import { UserOrderService } from '../user.order/user.order.service';
import { BaseComponent } from '../models/components/base.component';

@Injectable()
export class OrderService {

    constructor(
        private orderRepository: OrderRepository,
        private orderLineService: OrderLineService,
        private userOrderService: UserOrderService
        )
        {}

    async orders(){
        const ordersDb = await this.orderRepository.orders();
        if(!ordersDb || ordersDb.length === 0) throw new NotFoundException('No order founds');
        const mappedOrders =  orderMapper.mapOrders(ordersDb);
        return new BaseComponent(200, "succesfull", {orders: mappedOrders});
    }

    async ordersById(id: number){
        const mappedOrderDetail = await this.orderDetailMap(id);
        return new BaseComponent(200, "succesfull", {order: mappedOrderDetail});
    }

    async addOrder(dto: OrderDto) {
        const createdOrder = await this.orderRepository.addOrder();
        const orderId = createdOrder.id;
        const orderLines = dto.order_lines || [];
        const userId = dto.userId ?? 0;
        await this.orderLineService.addOrderLinesByOrderId(orderId, orderLines);
        await this.userOrderService.addUserOrder(userId, orderId);
        const mappedOrderDetail = await this.orderDetailMap(createdOrder.id);
        return new BaseComponent(201, "succesfull", {order: mappedOrderDetail});
    }

    async updateOrderById(id: number, dto: OrderDto){
        const updatedOrder = await this.orderRepository.updateOrderId(id);
        const orderLines = dto.order_lines || [];
        await this.orderLineService.updateOrderLinesByOrderId(updatedOrder.id, orderLines);
        const mappedOrderDetail = await this.orderDetailMap(updatedOrder.id);
        return new BaseComponent(200, "succesfull", {order: mappedOrderDetail});
    }


    private async orderDetailMap(id: number){
        const orderDetail = await this.orderRepository.orderById(id);
        if(!orderDetail) throw new NotFoundException('No order found with Id ' + id);
        return orderMapper.mapOrderDetail(orderDetail);
    }
}
