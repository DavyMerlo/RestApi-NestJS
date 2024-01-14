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

    async subCategories() : Promise<SubCategoryComponent> {
        const subCategoriesDB = await this.subCategoryRepository.subCategoriesDB();
        if(!subCategoriesDB || subCategoriesDB.length === 0) throw new NotFoundException('No subcategories found');
        const mappedCategories = subCategoryMapper.mapSubCategory(subCategoriesDB);
        return new SubCategoryComponent(200, "succesfull", mappedCategories);
    }

    async subCategoryById(id: number) {
        const subCategoryDetailDB = await this.subCategoryRepository.subCategoryByIdDB(id);
        if(!subCategoryDetailDB) throw new NotFoundException(`No subcategory found wit Id: ${id}`);
        const mappedSubCategoryDetail = subCategoryMapper.mapSubCategoryDetail(subCategoryDetailDB);
        return new SubCategoryDetailComponent(200, "succesfull", mappedSubCategoryDetail);
    }

    async addSubCategory(dto: SubCategoryDto) : Promise<SubCategoryDetailComponent>{
        const createdSubCategory = await this.subCategoryRepository.addSubCategoryDB(dto);
        const subCategoryDetail = await this.subCategoryRepository.subCategoryByIdDB(createdSubCategory.id);
        const mappedSubCategoryDetail = subCategoryMapper.mapSubCategoryDetail(subCategoryDetail);
        return new SubCategoryDetailComponent(200, "succesfull", mappedSubCategoryDetail);
    }
}

