import { Injectable, NotFoundException } from '@nestjs/common';
import { SubCategoryRepository } from './subcategory.repostory';
import { subCategoryMapper } from './mapper/subcategory.mapper';
import { SubCategoryComponent } from '../models/components/subcategory.component';
import { SubCategoryDetailComponent } from '../models/components/subcategorydetail.component';
import { SubCategoryDto } from './dto/subcategory.dto.';

@Injectable({})
export class SubcategoryService {

    constructor(
    private subCategoryRepository: SubCategoryRepository
    )
    {}

    async subCategories() {
        const subCategoriesDB = await this.subCategoryRepository.subCategoriesDB();
        if(!subCategoriesDB || subCategoriesDB.length === 0) throw new NotFoundException('No subcategories found');
        const mappedCategories = subCategoryMapper.mapSubCategory(subCategoriesDB);
        return new SubCategoryComponent(200, "succesfull", mappedCategories);
    }

    async subCategoryById(id: number) {
        const mappedSubCategoryDetail = await this.subCategoryDetailMap(id);
        return new SubCategoryDetailComponent(200, "succesfull", mappedSubCategoryDetail);
    }

    async addSubCategory(dto: SubCategoryDto){
        const createdSubCategory = await this.subCategoryRepository.addSubCategoryDB(dto);
        const mappedSubCategoryDetail = await this.subCategoryDetailMap(createdSubCategory.id);
        return new SubCategoryDetailComponent(200, "succesfull", mappedSubCategoryDetail);
    }

    private async subCategoryDetailMap(id: number){
        const subCategoryDetail = await this.subCategoryRepository.subCategoryByIdDB(id);
        if(!subCategoryDetail) throw new NotFoundException('No subcategories found with Id ' + id);
        return subCategoryMapper.mapSubCategoryDetail(subCategoryDetail);
    }
}

