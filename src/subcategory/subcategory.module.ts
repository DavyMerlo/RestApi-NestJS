import { Module } from '@nestjs/common';
import { SubcategoryController } from './subcategory.controller';
import { SubcategoryService } from './subcategory.service';
import { SubCategoryRepository } from './subcategory.repostory';

@Module({
    controllers: [SubcategoryController],
    providers: [
        SubcategoryService, 
        SubCategoryRepository
    ]
})
export class SubcategoryModule {}
