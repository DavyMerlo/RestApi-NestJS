import { Injectable, NotFoundException } from '@nestjs/common';
import { SubCategoryRepository } from './subcategory.repostory';
import { subCategoryMapper } from './mapper/subcategory.mapper';
import { SubCategoryDto } from './dto/subcategory.dto.';
import { BaseComponent } from '../models/components/base.component';
import { categories } from '../models/category';

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
        return new BaseComponent(200, "succesfull", {sub_categories: mappedCategories});
    }

    async subCategoryById(id: number) {
        const mappedSubCategoryDetail = await this.subCategoryDetailMap(id);
        return new BaseComponent(200, "succesfull", {sub_category: mappedSubCategoryDetail});
    }

    async addSubCategory(dto: SubCategoryDto){
        const createdSubCategory = await this.subCategoryRepository.addSubCategoryDB(dto);
        const mappedSubCategoryDetail = await this.subCategoryDetailMap(createdSubCategory.id);
        return new BaseComponent(201, "succesfull", {sub_category: mappedSubCategoryDetail});
    }

    async updateSubCategory(id: number, dto: SubCategoryDto){
        const updatedSubCategory = await this.subCategoryRepository.updateSubCategoryByIdDB(id,dto);
        const mappedSubCategoryDetail = await this.subCategoryDetailMap(updatedSubCategory.id);
        return new BaseComponent(200, "succesfull", {sub_category: mappedSubCategoryDetail});
    }

    private async subCategoryDetailMap(id: number){
        const subCategoryDetail = await this.subCategoryRepository.subCategoryByIdDB(id);
        if(!subCategoryDetail) throw new NotFoundException('No subcategories found with Id ' + id);
        return subCategoryMapper.mapSubCategoryDetail(subCategoryDetail);
    }
}

