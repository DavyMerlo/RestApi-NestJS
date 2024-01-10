import { SortingOption } from "../enums/sortingoption.enum";

export class SortingOptionsFactory {

    private orderBySortOptions: Record<string, any> = {
        [SortingOption.NAME_ASC]: { name: 'asc' },
        [SortingOption.NAME_DESC]: { name: 'desc' },
        [SortingOption.ID_ASC]: { id: 'asc' },
        [SortingOption.ID_DESC]: { id: 'desc' },
        [SortingOption.PRICE_ASC]: { price: 'asc' },
        [SortingOption.PRICE_DESC]: { price: 'desc' },
    };

    generateSortingOption(sortParam: SortingOption | undefined){
        if(!sortParam){
            return this.orderBySortOptions[SortingOption.ID_ASC];
        }
        return this.orderBySortOptions[sortParam];
    };
}