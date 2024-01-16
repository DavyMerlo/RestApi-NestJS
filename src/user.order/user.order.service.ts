import { Injectable } from '@nestjs/common';
import { UserOrderRepository } from './user.order.repository';

@Injectable()
export class UserOrderService {

    constructor(private userOrderRepository: UserOrderRepository){}

    async addUserOrder(userId: number, orderId: number){
        await this.userOrderRepository.addUserOrder(userId, orderId);
    }
}
