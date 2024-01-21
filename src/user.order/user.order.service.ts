import { Injectable, NotFoundException } from '@nestjs/common';
import { UserOrderRepository } from './user.order.repository';

@Injectable()
export class UserOrderService {

    constructor(private userOrderRepository: UserOrderRepository){}

    async ordersByUserId(userId: number){
        const ordersByUserId = await this.userOrderRepository.ordersByUserId(userId);
        if(!ordersByUserId || ordersByUserId.length === 0) throw new  NotFoundException('No orders found associated with userId: ' + userId);
        return ordersByUserId;
    }

    async userByOrderId(orderId: number){
        const userByOrderId = await this.userOrderRepository.userByOrderId(orderId);
        if(!userByOrderId) throw new  NotFoundException('No user found associated with orderId: ' + orderId);
        return userByOrderId;
    }

    async addUserOrder(userId: number, orderId: number){
        await this.userOrderRepository.addUserOrder(userId, orderId);
    }
}
