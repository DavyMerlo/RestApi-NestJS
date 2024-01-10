import { Injectable} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import * as argon from 'argon2';


@Injectable()
export class AuthRepository {

    constructor(private readonly db: PrismaService){}

    async getUserById(userId: number){
       try{
        const user = await this.db.user.findUnique({
            where: {
                id: userId,
            }
        });
        return user;
       }catch(error){
        throw new Error('User not found');
       }
    }

    async getUserByEmail(email: string){
        try{
            const user = await this.db.user.findUnique({
                where: {
                    email: email
                },
            });
            return user;
        }
        catch(error){
            throw new Error('User not found');
        }
    }

    async createUser(dto: RegisterDto){
        try{
            const hash = await argon.hash(dto.password);
            const user = await this.db.user.create({
                data: {
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    email: dto.email,
                    hash
                }
            });
            return user;
        }catch(error){
            throw new Error('Invalid user data');
        }
    }

    async updateRefreshTokenUser(userId: number, refreshToken: string){
        try{
            const hash = await argon.hash(refreshToken);
        await this.db.user.update({
            where: {
                id: userId,
            },
            data : {
                hashedRt: hash
            }
        })
        }catch(error){
            throw new Error('Invalid user data');
        }
    }

    async updateAllRefreshTokensUser(userId: number){
        try{
            await this.db.user.updateMany({
                where: {
                    id: userId,
                    hashedRt: {
                        not: null
                    }
                },
                data: {
                    hashedRt: null
                }
            });
            return true;
        }catch(error){
            throw new Error('Invalid user data');
        }
    }
}