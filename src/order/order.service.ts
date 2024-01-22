import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { orderMapper } from './mapper/order.mapper';
import { OrderComponent } from '../models/components/order.component';
import { OrderDetailComponent } from '../models/components/orderdetail.component';
import { OrderDto } from './dto/order.dto';
import { OrderLineService } from '../orderline/orderline.service';
import { UserOrderService } from '../user.order/user.order.service';

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
        return new OrderComponent(200, "succesfull", mappedOrders);
    }

    async ordersById(id: number){
        const mappedOrderDetail = await this.orderDetailMap(id);
        return new OrderDetailComponent(200, "succesfull", mappedOrderDetail);
    }

    async addOrder(dto: OrderDto) {
        const createdOrder = await this.orderRepository.addOrder();
        const orderId = createdOrder.id;
        const orderLines = dto.order_lines || [];
        const userId = dto.userId ?? 0;
        await this.orderLineService.addOrderLinesByOrderId(orderId, orderLines);
        await this.userOrderService.addUserOrder(userId, orderId);
        const mappedOrderDetail = await this.orderDetailMap(createdOrder.id);
        return new OrderDetailComponent(201, 'succesfull', mappedOrderDetail);
    }

    async updateOrderById(id: number, dto: OrderDto){
        const updatedOrder = await this.orderRepository.updateOrderId(id);
        const orderLines = dto.order_lines || [];
        await this.orderLineService.updateOrderLinesByOrderId(updatedOrder.id, orderLines);
        const mappedOrderDetail = await this.orderDetailMap(updatedOrder.id);
        return new OrderDetailComponent(200, 'succesfull', mappedOrderDetail);
    }


    private async orderDetailMap(id: number){
        const orderDetail = await this.orderRepository.orderById(id);
        if(!orderDetail) throw new NotFoundException('No order found with Id ' + id);
        return orderMapper.mapOrderDetail(orderDetail);
    }
}
