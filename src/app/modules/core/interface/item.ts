import { PriceItem } from "./price-item";
import { Shipping } from "./shipping";

export interface Item {
    id: string,
    title: string,
    price: PriceItem,
    picture: string,
    condition: string,
    free_shipping: Shipping,
    sold_quantity: number,
    description: string,
}
