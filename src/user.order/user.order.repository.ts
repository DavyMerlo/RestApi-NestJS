import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";


@Injectable()
export class UserOrderRepository {

    constructor(private readonly db: PrismaService) {}

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