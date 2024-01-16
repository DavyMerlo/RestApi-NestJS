import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { OrderLineDto } from "./dto/orderline.dto";


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
}