import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AddressRepository {

    constructor(private readonly db: PrismaService){}

    async addressesDB(){
        try{
            const addresses = await this.db.address.findMany();
            return addresses;
        }catch(error){
            throw new Error('Failed to fetch addresses');
        }
    }

    async addressByIdDB(id: number){
        try{
            const address = await this.db.address.findUnique({
                where: {
                    id : id
                }
            });
            return address;
        }
        catch(error){
            throw new Error('Failed to fetch address by ' + id);
        }
    }
}