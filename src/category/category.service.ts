import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { categoryMapper } from './mapper/category.mapper';
import { CategoryDto } from './dto/catogory.dto.type';
import { BaseComponent } from '../models/components/base.component';


@Injectable()
export class CategoryService {

    constructor(private categoryRepository: CategoryRepository){}

    async categories(){
        const categoriesDB = await this.categoryRepository.categoriesDB();
        if(!categoriesDB || categoriesDB.length === 0) throw new NotFoundException('No categories found');
        const mappedCategories = categoryMapper.mapCategory(categoriesDB);
        return new BaseComponent(200, "succesfull", {categories: mappedCategories});
    }

    async categoryById(id: number){
        const mappedCategoryDetail = await this.categoryDetailMap(id);
        return new BaseComponent(200, "succesfull", {category: mappedCategoryDetail});
    }

    async addCategory(dto: CategoryDto){
        const createdCategory = await this.categoryRepository.addCategoryDB(dto);
        const mappedCategoryDetail = await this.categoryDetailMap(createdCategory.id);
        return new BaseComponent(201, "succesfull", {category: mappedCategoryDetail});
    }

    async updateCategory(id: number, dto: CategoryDto){
        const updatedCategory = await this.categoryRepository.updateCategoryByIdDB(id, dto);
        const mappedCategoryDetail = await this.categoryDetailMap(updatedCategory.id);
        return new BaseComponent(200, "succesfull", {category: mappedCategoryDetail});
    }

    private async categoryDetailMap(id: number){
        const categoryDetail = await this.categoryRepository.categoryByIdDB(id);
        if(!categoryDetail) throw new NotFoundException('No categories found with Id ' + id);
        return categoryMapper.mapCategoryDetail(categoryDetail);
    }
}
