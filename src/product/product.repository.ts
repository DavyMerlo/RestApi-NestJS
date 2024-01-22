import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SortingOptionsFactory } from "./factory/sortingoptions.factory";
import { SortingOption } from "./enums/sortingoption.enum";
import { ProductDto } from "./dto/product.dto";

@Injectable()
export class ProductRepository {

    constructor(private readonly db: PrismaService){}

    async productsDB() {
        try{
            const products = await this.db.product.findMany({
                where: {
                    deletedAt: null
                },
                include: {
                    subCategory: {
                        include: {
                            category: true
                        }
                    },
                }
            });
            return products;
        }
        catch(error){
            throw new Error('Failed to fetch products');
        }
    }

    async productByIdDB(id: number) {
        try{
            const product = await this.db.product.findUnique({
                where: {
                    id: id,
                    deletedAt:  null
                },
                include: {
                    subCategory: {
                        include: {
                            category: true
                        }
                    },
                }
            });
            return product;
        }
        catch(error){
            throw new Error('Failed to fetch product with ' + id);
        }
    }

    async productsPaginatedDb(
        sortParam: SortingOption | undefined,
        page: number, 
        pageSize: number, 
        offset: number | undefined, 
        limit: number | undefined
        ) {
        try{
            const factory = new SortingOptionsFactory();
            const orderBy = factory.generateSortingOption(sortParam);
            const skip = (page - 1) * pageSize + (offset ?? 0);
            let take = pageSize;
            if (limit && limit < pageSize) {
                take = limit;
            }
            const products = await this.db.product.findMany({
                where: {
                    deletedAt: null
                },
                include: {
                    subCategory: {
                        include: {
                            category: true
                        }
                    },
                },
                orderBy,
                take,
                skip
            });
            
            return products;
        }catch(error){
                throw new Error('Failed to fetch products');
        }
    }

    async searchProductsDB(query: string | undefined, limit: number | undefined){
        try{
            const parsedLimit: number | undefined = limit ? limit : undefined;
            const products = await this.db.product.findMany({
                where: {
                    deletedAt: null,
                    ...(query
                        ? {
                              OR: [{ name: { contains: query, mode: 'insensitive' } }],
                          }
                        : {}),
                },
                take: parsedLimit,
                include: {
                    subCategory: {
                        include: {
                            category: true,
                        },
                    },
                },
            });
            return products
        }
        catch(error){
            throw new Error('Failed to fetch products');
        }
    }

    async productCount(){
        try{
            const productCount = await this.db.product.count({
                where: {
                    deletedAt: null
                }
            }); 
            return productCount;
        }
        catch(error){
            throw new Error('Failed to count products');
        }
    }

    async addProductDB(dto: ProductDto){
        try{
            const newProduct = await this.db.product.create({
                data: {
                    ...dto,
                }
            });
            return newProduct;
        }catch(error){
            throw new Error('Failed to add product');
        }
    }

    async softDeleteProduct(id: number) {
        try {
            await this.db.product.update({
                where: {
                    id: id
                },
                data: {
                    deletedAt: new Date()
                }
            });
        } catch (error) {
            throw new Error('Failed to soft-delete product');
        }
    }
}