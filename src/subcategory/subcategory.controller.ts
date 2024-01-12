import { SubcategoryService } from './subcategory.service';
import { SubCategoryComponent } from '../models/components/subcategory.component';
import { Body, Controller, Get, HttpCode, HttpStatus} from '@nestjs/common';
import { Public } from '../common/decorators';

@Controller('api/v1/subcategories')
export class SubcategoryController {

    constructor(private subCategoryService: SubcategoryService){}

    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    subCategories() : Promise<SubCategoryComponent> {
        return this.subCategoryService.subCategories();
    }
}


