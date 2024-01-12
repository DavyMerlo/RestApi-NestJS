import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SubCategoryRepository {

    constructor(private readonly db: PrismaService){}

    async subCategoriesDB(){
        try{
            const subCategories = await this.db.subCategory.findMany({
                include: {
                    category: true
                }
            })
            return subCategories;
        }
        catch(error){
            throw new Error('Failed to fetch categories');
        }
    }

    async subCategoryByIdDB(id: number) {
        try{
            const subCategory = await this.db.subCategory.findUnique({
                where: {
                    id: id
                },
                include: {
                    category: true
                }
            });
            return subCategory;
        }
        catch(error){
            throw new Error('Failed to fetch product with ' + id);
        }
    }

}