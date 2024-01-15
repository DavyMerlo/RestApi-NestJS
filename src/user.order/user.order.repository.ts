import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";


@Injectable()
export class UserOrderRepository {

    constructor(private readonly db: PrismaClient) {}

    async addUserOrder(userId: number, orderId: number){
        try{
            const userOrder = await this.db.userOrder.create({
                data: {
                    userId: userId,
                    orderId: orderId,
                }
            });
        }catch(error){
            throw new Error('Failed to add userorder');
        }
    }
}