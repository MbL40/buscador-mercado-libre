import { InfoAuthor } from "./info-author";
import { Item } from "./item";

export interface InfoItem {

    author: InfoAuthor;
    categories: Array<String>;
    items: Item[];
}
