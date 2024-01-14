import { Controller, Get, HttpCode, HttpStatus, Query, Req} from '@nestjs/common';
import { Request } from "express";
import { ProductService } from './product.service';
import { SortingOption } from './enums/sortingoption.enum';
import { Public } from '../common/decorators/public.decorator';

@Controller('api/v2/products')
export class ProductV2Controller {

    constructor(private productService: ProductService) {}

    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    productsPaginated(
        @Query('sort') sortParam: SortingOption | undefined,
        @Query('page') page: string, 
        @Query('pageSize') pageSize: string, 
        @Query('offset') offset: string,
        @Query('limit') limit: string,
        @Req() req: Request
    ){

        const baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}`
        return this.productService.productsPaginated(
            sortParam, 
            parseInt(page),
            parseInt(pageSize),
            parseInt(offset) || undefined,
            parseInt(limit) || undefined,
            baseUrl
        );
    }

    @Public()
    @Get('search')
    @HttpCode(HttpStatus.OK)
    searchProducts(
        @Query('query') queryParam: string,
        @Query('limit') limit: string
        ){
        return this.productService.searchProducts(queryParam, parseInt(limit) || undefined);
    }
}    