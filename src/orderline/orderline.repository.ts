import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";


@Injectable()
export class OrderLineRepository {

    constructor(private readonly db: PrismaClient){}

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
}