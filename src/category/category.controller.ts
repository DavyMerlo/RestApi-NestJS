import { CategoryService } from './category.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';

@Controller('api/v1/categories')
export class CategoryController {

    constructor(private categoryService: CategoryService) {}

    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    async subCategories()  {
        return this.categoryService.categories();
    }

    @Public()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async subCategoryById(@Param('id') id: string) {
        return this.categoryService.categoryById(parseInt(id));
    }
}
