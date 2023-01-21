export interface IProductItem {
  id: number;
  name: string;
  detail: string;
}

export interface ProductState {
  list: Array<IProductItem>;
  current_page: number;
  count_pages: number;
  total: number;
}

export interface ISearchProduct {
  name: string;
  page: number | string;
  rowsPerPage: number | string;
}

export interface IProductResponse {
  data: Array<IProductItem>;
  current_page: number;
  last_page: number;
  total: number;
}

export enum ProductActionTypes {
  PRODUCT_LIST = "PRODUCT_LIST",
  DELETE_PRODUCT = "DELETE_PRODUCT",
  ADD_PRODUCT = "ADD_PRODUCT",
}

export interface GetProductsAction {
  type: ProductActionTypes.PRODUCT_LIST;
  payload: ProductState;
}

export interface AddProductAction {
  type: ProductActionTypes.ADD_PRODUCT;
  payload?: ProductState;
}

export interface DeleteProductAction {
  type: ProductActionTypes.DELETE_PRODUCT;
  payload?: ProductState;
}

export type ProductActions =
  | GetProductsAction
  | DeleteProductAction
  | AddProductAction;
