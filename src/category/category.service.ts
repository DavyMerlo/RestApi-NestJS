import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { categoryMapper } from './mapper/category.mapper';
import { CategoryComponent } from '../models/components/category.component';
import { CategoryDetailComponent } from '../models/components/categorydetail.component';
import { CategoryDto } from './dto/catogory.dto.type';


@Injectable()
export class CategoryService {

    constructor(private categoryRepository: CategoryRepository){}

    async categories(){
        const categoriesDB = await this.categoryRepository.categoriesDB();
        if(!categoriesDB || categoriesDB.length === 0) throw new NotFoundException('No categories found');
        const mappedCategories = categoryMapper.mapCategory(categoriesDB);
        return new CategoryComponent(200, "succesfull", mappedCategories);
    }

    async categoryById(id: number){
        const mappedCategorieDetail = await this.categoryDetailMap(id);
        return new CategoryDetailComponent(200, "succesfull", mappedCategorieDetail);
    }

    async addCategory(dto: CategoryDto){
        const createdCategory = await this.categoryRepository.addCategoryDB(dto);
        const mappedCategorieDetail = await this.categoryDetailMap(createdCategory.id);
        return new CategoryComponent(200, "succesfull", mappedCategorieDetail);
    }

    async updateCategory(id: number, dto: CategoryDto){
        const updatedCategory = await this.categoryRepository.updateCategoryByIdDB(id, dto);
        const mappedCategorieDetail = await this.categoryDetailMap(updatedCategory.id);
        return new CategoryComponent(200, "succesfull", mappedCategorieDetail);
    }

    private async categoryDetailMap(id: number){
        const categoryDetail = await this.categoryRepository.categoryByIdDB(id);
        if(!categoryDetail) throw new NotFoundException('No categories found with Id ' + id);
        return categoryMapper.mapCategoryDetail(categoryDetail);
    }
}
