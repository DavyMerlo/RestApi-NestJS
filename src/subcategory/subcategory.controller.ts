import { SubcategoryService } from './subcategory.service';
import { SubCategoryComponent } from '../models/components/subcategory.component';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';
import { SubCategoryDetailComponent } from '../models/components/subcategorydetail.component';
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
        console.log('object: ' + dto)
        return await this.subCategoryService.addSubCategory(dto);
    }
}


