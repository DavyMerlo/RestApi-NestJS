import { Injectable, NotFoundException } from '@nestjs/common';
import { UserOrderRepository } from './user.order.repository';
import { userOrderMapper } from './mapper/user.order.mapper';

@Injectable()
export class UserOrderService {

    constructor(private userOrderRepository: UserOrderRepository){}

    async ordersByUserId(userId: number){
        const ordersByUserIdDB = await this.userOrderRepository.ordersByUserId(userId);
        if(!ordersByUserIdDB || ordersByUserIdDB.length === 0) throw new  NotFoundException('No orders found associated with userId: ' + userId);
        const mappedOrdersUser = userOrderMapper.mapUserOrderList(ordersByUserIdDB);
        return mappedOrdersUser;
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
