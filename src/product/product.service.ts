import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { SortingOption } from './enums/sortingoption.enum';
import { ProductDto } from './dto/product.dto';
import { productMapper } from './mapper/product.mapper';
import { BaseComponent } from '../models/components/base.component';

@Injectable({})
export class ProductService {

    constructor(
    private productRepository: ProductRepository
    ){}

    async products() {
        const productsDB = await this.productRepository.productsDB();
        if(!productsDB || productsDB.length === 0) throw new NotFoundException('No products found');
        const mappedProducts = productMapper.mapProduct(productsDB);
        return new BaseComponent(200, "succesfull", {products: mappedProducts});
    }

    async productById(id: number) {
        const mappedProductDetail = await this.productDetailMap(id);
        return new BaseComponent(200, "successful", { product: mappedProductDetail });
    }

    async searchProducts(
        query: string, 
        limit: number | undefined) {
        const productsDB = await this.productRepository.searchProductsDB(query, limit);
        if(!productsDB || productsDB.length === 0) throw new NotFoundException('No products found');
        const mappedProducts = productMapper.mapProduct(productsDB);
        return new BaseComponent(200, "succesfull", {products: mappedProducts});
    };

    async productsPaginated(
        sortParam: SortingOption | undefined, 
        page: number,
        pageSize: number,
        offset: number | undefined,
        limit: number | undefined,
        baseUrl: string
        ) { 
        const productsDB = await this.productRepository.productsPaginatedDb(
            sortParam, 
            page, 
            pageSize,
            offset, 
            limit
            );
        if(!productsDB || productsDB.length === 0) throw new NotFoundException('No products found');
        const mappedProducts = productMapper.mapProduct(productsDB);
        const productCountDB = await this.productRepository.productCount();
        const pages: number = Math.ceil(productCountDB / pageSize);
        const nextUrl = page < pages ? `${baseUrl}?page=${page + 1}&pageSize=${pageSize}` : null;
        const previousUrl = page > 1 ? `${baseUrl}?page=${page - 1}&pageSize=${pageSize}` : null;
        const hasNext = page < pages;
        const hasPrevious = page > 1;
        const metaData = {
            total: productCountDB,
            pages: pages,
            page: page,
            next: nextUrl,
            previous: previousUrl,
            hasNext: hasNext,
            hasPrevious: hasPrevious
        };
        return new BaseComponent(200, "succesfull", {products: mappedProducts, metaData})
    }

    async addProduct(dto: ProductDto) {
        const createdProduct = await this.productRepository.addProductDB(dto);
        const mappedProductDetail = await this.productDetailMap(createdProduct.id);
        return new BaseComponent(201, "succesfull", {product: mappedProductDetail});
    }

    async softDeleteProduct(id: number){
        await this.productDetailMap(id);
        await this.productRepository.softDeleteProduct(id);
        return new BaseComponent(200, "succesfull", {});
    }

    private async productDetailMap(id: number){
        const productDetail = await this.productRepository.productByIdDB(id);
        if(!productDetail) throw new NotFoundException('No product found with ' + id);
        return productMapper.mapProductDetail(productDetail);
    }
}
