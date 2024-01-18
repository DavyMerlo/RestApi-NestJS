import { CategoryService } from './category.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { CategoryDto } from './dto/catogory.dto.type';

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

    @Public()
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addCategory(@Body() dto: CategoryDto){
        return await this.categoryService.addCategory(dto);
    }

    @Public()
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async updateCategory(
        @Param('id') id: string,
        @Body() dto: CategoryDto
    ){
        return await this.categoryService.updateCategory(parseInt(id), dto);
    }
}
