import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";


@Injectable()
export class OrderRepository {

    constructor(private readonly db: PrismaService){}

    async orders(){
        try{
            const orders = await this.db.order.findMany({
                include: {
                    orderLines: true
                }
            });
            return orders;
        }catch(error){
            throw new Error('Failed to fetch orders');
        }
    }

    async ordersById(id: number){
        try{
            const orderDetail = await this.db.order.findUnique({
                where: {
                    id: id
                },
                include: {
                    orderLines: {
                        include: {
                            product: true
                        }
                    }
                }
            });
            return orderDetail;
        }catch(error){
            throw new Error('Failed to fetch order with ' + id);
        }
    }
}