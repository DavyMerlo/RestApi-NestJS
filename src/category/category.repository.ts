import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";


@Injectable()
export class CategoryRepository {
    constructor(private readonly db: PrismaService){}

    async categoriesDB(){
        try{
            const categories = await this.db.category.findMany({
                include: {
                    subCategories: true
                }
            })
            return categories;
        }catch(error){
            throw new Error('Failed to fetch ')
        }
    }

    async categoryByIdDB(id: number){
        try{
            const category = await this.db.category.findUnique({
                where: {
                    id: id
                },
                include: {
                    subCategories: true
                }
            });
            return category;
        }catch(error){
            throw new Error('Failed to fetch category with ' + id);
        }
    }
}