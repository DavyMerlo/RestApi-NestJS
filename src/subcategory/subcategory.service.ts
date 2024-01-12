import { Injectable, NotFoundException } from '@nestjs/common';
import { SubCategoryRepository } from './subcategory.repostory';
import { mapper } from './mapper/subcategory.mapper';
import { SubCategoryComponent } from '../models/components/subcategory.component';

@Injectable({})
export class SubcategoryService {

    constructor(
    private subCategoryRepository: SubCategoryRepository
    )
    {}

    async subCategories() : Promise<SubCategoryComponent> {
        const subCategoriesDB = await this.subCategoryRepository.subCategoriesDB();
        if(!subCategoriesDB || subCategoriesDB.length === 0) throw new NotFoundException('No subcategories found');
        const mappedCategories = mapper.mapSubCategory(subCategoriesDB);
        return new SubCategoryComponent(200, "succesfull", mappedCategories);
    }
}

