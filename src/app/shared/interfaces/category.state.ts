import { Category } from './category';

export interface CategoryState {
    loading: boolean;
    categories: Category[];
}