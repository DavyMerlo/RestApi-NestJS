import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { OrderLineDto } from "./dto/orderline.dto";
import { Prisma } from "@prisma/client";


@Injectable()
export class OrderLineRepository {
    
    constructor(private readonly db: PrismaService){}

    async orderLines(){
        try{
            const orderLine = await this.db.orderLine.findMany({
                include: {
                    order: true,
                    product: true,
                }
            });
            return orderLine;
        }catch(error){
            throw new Error('Failed to fetch orderlines');
        }
    }

    async orderLineById(id: number){
        try{
            const orderLineDetail = await this.db.orderLine.findUnique({
                where : {
                    id: id
                },
                include: {
                    order: true,
                    product: true,
                }
            });
            return orderLineDetail;
        }catch(error){
            throw new Error('Failed to fetch orderline with ' + id);
        }
    }

    async addOrderLinesByOrderId(orderId: number, dto: OrderLineDto[]){
        try{
            const orderLinesData = dto.map((orderLine) => ({
                ...orderLine,
                orderId: orderId,
            }));
            await this.db.orderLine.createMany({
                data: orderLinesData
            });
        }catch(error){
            throw new Error('Failed to add orderline');
        }
    }

    async updateOrderLinesByOrderId(orderId: number, dto: OrderLineDto[]){
        try{
            const currentOrderLines = await this.db.orderLine.findMany({
                where: {
                    orderId: orderId,
                },
            });

            for (const orderline of dto) {
                const currentOrderLine = currentOrderLines.find(
                    (line) => line.productId === orderline.productId
                );

                if (currentOrderLine) {
                    this.updateOrderLineById(currentOrderLine.id, orderline.quantity);
                } else {
                    this.addOrderLineByOrderId(orderId, orderline);
                }
            }
        }catch(error){
            throw new Error('Failed to update orderlines with orderId: ' + orderId);
        }
    }

    async addOrderLineByOrderId(orderId: number, dto: OrderLineDto){
        try{
            await this.db.orderLine.create({
                data: {
                    ...dto,
                    orderId: orderId
                }
            })
        }catch(error){
            throw new Error('Fail to add orderline with orderId ' + orderId);
        }
    }

    async updateOrderLineById(id: number, quantity: number){
        try{
            await this.db.orderLine.update({
                where: {
                    id: id
                },
                data: {
                    quantity
                }
            });
        }catch(error){
            throw new Error('Failed to update orderline with Id: ' + id);
        }
    }
}