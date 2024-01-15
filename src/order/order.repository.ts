import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { OrderDto } from "./dto/order.dto";
import { Prisma } from "@prisma/client";


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

    async orderById(id: number){
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

    async addOrder(dto: OrderDto){
        try{
            const newOrder = await this.db.order.create({
                data: {
                    date: dto.date
                },
            });
            const orderId = newOrder.id;
            const orderLinesData = dto.order_lines.map((orderLine) => ({
                ...orderLine,
                orderId: orderId,
            }));

            const newOrderLines = await this.db.orderLine.createMany({
                data: orderLinesData,
            });
            const newUserOrder = await this.db.userOrder.create({
                data: {
                    userId: parseInt(dto.userId),
                    orderId: newOrder.id,
                },
            });
        return newOrder;
        }catch(error){
            throw new Error('Failed to add order');
        }
    }
}