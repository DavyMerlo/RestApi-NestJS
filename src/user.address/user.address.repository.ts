import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";


@Injectable()
export class UserAddressRepository {

    constructor(private readonly db: PrismaService){}

    async addressesByUserId(userId: number){
        try{
            const userAddresses = await this.db.userAddress.findMany({
                where: {
                    userId : userId
                },
                include: {
                    user: true,
                    address: true
                }
            });
            return userAddresses;
        }catch(errro){
            throw new Error('Failed to fetch address by userId: ' + userId);
        }
    }

    async userByAddressId(addressId: number){
        try{
            const userAddresses = await this.db.userAddress.findMany({
                where: {
                    addressId : addressId
                },
                include: {
                    user: true,
                    address: true
                }
            });
            return userAddresses;
        }catch(errro){
            throw new Error('Failed to fetch user by addressId: ' + addressId);
        }
    }
}