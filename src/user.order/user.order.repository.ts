import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";


@Injectable()
export class UserOrderRepository {

    constructor(private readonly db: PrismaService) {}


    async ordersByUserId(userId: number){
        try{
            const userOrders = await this.db.userOrder.findMany({
                where: {
                    userId: userId
                },
                include: {
                    user: true,
                    order: true
                }
            });
            console.log(userOrders)
            return userOrders;
        }catch(error){
            throw new Error('Failed to fetch orders by userId: ' + userId);
        }
    }

    async userByOrderId(orderId: number){
        try{
            const orderUser = await this.db.userOrder.findFirst({
                where: {
                    orderId: orderId
                },
                include: {
                    user: true,
                    order: true
                }
            });
            return orderUser;
        }catch(error){
            throw new Error('Failed to fetch user by orderId ' + orderId);
        }
    }

    async addUserOrder(userId: number, orderId: number){
        try{
            await this.db.userOrder.create({
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