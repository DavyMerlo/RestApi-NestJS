import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";


@Injectable()
export class UserRepository {
    constructor(private readonly db: PrismaService){}

    async usersDB(){
        try{
            const users = await this.db.user.findMany();
            return users;
        }catch(error){
            throw new Error('Failed to fetch users');
        }
    }

    async userByIdDB(id: number){
        try{
            const user = await this.db.user.findUnique({
                where: {
                    id: id
                },
                include: {
                    userAddresses: {
                        include: {
                            address: true
                        }
                    },
                    userOrders: {
                        include: {
                            order: true
                        }
                    }
                }
            });
            return user;
        }catch(error){
            throw new Error('Faled to fetch user with ' + id);
        }
    }

    async deleteUserById(id: number){
        try{
            //Still thinking what i going to do hard or soft delete?
        }catch(error){
            throw new Error('Failed to delete user with ' + id);
        }
    }
    
}