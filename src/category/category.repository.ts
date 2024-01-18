import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CategoryDto } from "./dto/catogory.dto.type";


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

    async addCategoryDB(dto: CategoryDto){
        try{
            const newCategory = await this.db.category.create({
                data: {
                    ...dto
                }
            });
            return newCategory;
        }catch(error){
            throw new Error('Failed to add category');
        }
    }

    async updateCategoryByIdDB(id: number, dto: CategoryDto){
        try{
            const updatedCategory = await this.db.category.update({
                where: {
                    id: id
                },
                data : {
                    ...dto
                }
            });
            return updatedCategory;
        }catch(error){
            throw new Error('Failed to update category');
        }
    }
}