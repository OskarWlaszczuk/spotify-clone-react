import { CategoryData } from "../../Interfaces/CategoryData";

export interface CategoryConfig extends CategoryData {
    switcherButtonContent: string;
    pathname?: string;
}