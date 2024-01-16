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
        const orderDetail = await this.orderRepository.orderById(id);
        if(!orderDetail) throw new NotFoundException(`No order found wit Id: ${id}`);
        const mappedOrderDetail = orderMapper.mapOrderDetail(orderDetail);
        return new OrderDetailComponent(200, "succesfull", mappedOrderDetail);
    }

    async addOrder(dto: OrderDto) {
        const createdOrder = await this.orderRepository.addOrder(dto);
        const orderId = createdOrder.id;
        await this.orderLineService.addOrderLinesByOrderId(orderId, dto.order_lines);
        await this.userOrderService.addUserOrder(parseInt(dto.userId), orderId);
        const orderDetail = await this.orderRepository.orderById(createdOrder.id);
        const mappedOrderDetail = orderMapper.mapOrderDetail(orderDetail);
        return new OrderDetailComponent(201, 'succesfull', mappedOrderDetail);
    }
}
