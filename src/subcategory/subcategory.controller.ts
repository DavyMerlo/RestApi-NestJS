import { SubcategoryService } from './subcategory.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import { SubCategoryDto } from './dto/subcategory.dto.';
import { Public } from '../common/decorators/public.decorator';

@Controller('api/v1/subcategories')
export class SubcategoryController {

    constructor(private subCategoryService: SubcategoryService){}

    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    async subCategories() {
        return await this.subCategoryService.subCategories();
    }

    @Public()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async subCategoryById(@Param('id') id: string) {
        return await this.subCategoryService.subCategoryById(parseInt(id));
    }

    @Public()
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addSubCategory(@Body() dto: SubCategoryDto){
        return await this.subCategoryService.addSubCategory(dto);
    }

    @Public()
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async updateSubCategory(
        @Param('id') id: string,
        @Body() dto: SubCategoryDto
    ){
        return await this.subCategoryService.updateSubCategory(parseInt(id), dto);
    }
}


