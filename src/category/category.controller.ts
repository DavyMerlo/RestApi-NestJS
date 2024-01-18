import { CategoryService } from './category.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { CategoryComponent } from '../models/components/category.component';

@Controller('api/v1/categories')
export class CategoryController {

    constructor(private categoryService: CategoryService) {}

    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    subCategories()  {
        return this.categoryService.categories();
    }

    // @Public()
    // @Get(':id')
    // @HttpCode(HttpStatus.OK)
    // subCategoryById(@Param('id') id: string): Promise<SubCategoryDetailComponent>{
    //     return this.subCategoryService.subCategoryById(parseInt(id));
    // }

}
