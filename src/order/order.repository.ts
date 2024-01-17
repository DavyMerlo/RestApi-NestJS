import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { OrderDto } from "./dto/order.dto";
import { orderLines } from "../models/order.line";


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

    async addOrder(){
        try{
            const newOrder = await this.db.order.create({
                data: {
                    date: new Date()
                },
            });
        return newOrder;
        }catch(error){
            throw new Error('Failed to add order');
        }
    }

    async updateOrderId(id: number){

        const currentOrder = await this.db.order.findUnique({
            where: {
                id: id
            },
            include: {
                orderLines: true,
            }
        });

        if(!currentOrder){
            throw new Error('Order with Id: ' + id + ' not found');
        };

        const updatedOrder = await this.db.order.update({
            where: {
                id: id,
            },
            data: {
                date: new Date(),
            },
        });
        return updatedOrder;
    }
}