import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { categoryMapper } from './mapper/category.mapper';
import { CategoryComponent } from '../models/components/category.component';
import { CategoryDetailComponent } from '../models/components/categorydetail.component';


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
        const categoryDetail = await this.categoryRepository.categoryByIdDB(id);
        if(!categoryDetail) throw new NotFoundException('No category found with Id ' + id);
        const mappedSubCategoryDetail = await categoryMapper.mapCategoryDetail(categoryDetail);
        return new CategoryDetailComponent(200, "succesfull", mappedSubCategoryDetail);
    }
}
