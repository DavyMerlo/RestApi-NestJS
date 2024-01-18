import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SubCategoryDto } from "./dto/subcategory.dto.";

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
            throw new Error('Failed to fetch subcategories');
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
            throw new Error('Failed to fetch subcategory with ' + id);
        }
    }

    async addSubCategoryDB(dto: SubCategoryDto) {
        try{
            const newSubCategory = await this.db.subCategory.create({
                data: {
                    ...dto,
                }
            });
            return newSubCategory;
        }catch(error){
            throw new Error('Failed to add subcategory');
        }
    }

    async updateSubCategoryByIdDB(id: number, dto: SubCategoryDto){
        try{
            const updatedSubCategory = await this.db.subCategory.update({
                where: {
                    id: id
                },
                data: {
                    ...dto
                }
            });
            return updatedSubCategory;
        }catch(error){
            throw new Error('Failed to update subcategory');
        }
    }
}