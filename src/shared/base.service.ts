import { BaseComponent } from "../models/components/base.component";
import { ProductDto } from "../product/dto/product.dto";

export abstract class BaseService {

    constructor(private repository: any | any[]) {}

    abstract getAll() : Promise<BaseComponent<{}>>;

    abstract getById(id: number): Promise<BaseComponent<{}>>;

    abstract add(dto: ProductDto): Promise<BaseComponent<{}>>;

    abstract delete(id: number): Promise<BaseComponent<{}>>;
}