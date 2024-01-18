import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { categoryMapper } from './mapper/category.mapper';
import { CategoryComponent } from '../models/components/category.component';

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
        const category = await this.categoryRepository.categoryByIdDB(id);
        return category;
    }
}
