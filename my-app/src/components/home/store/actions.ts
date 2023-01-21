import { Dispatch } from "react";
import http from "../../../http_common";
import {
  IProductItem,
  IProductResponse,
  ProductActions,
  ProductActionTypes,
} from "./types";

export const GetProducts =
  (url: string) => async (dispatch: Dispatch<ProductActions>) => {
    try {
      const resp = await http.get<IProductResponse>(url);
      console.log(resp);
      const { data } = resp;
      dispatch({
        type: ProductActionTypes.PRODUCT_LIST,
        payload: {
          list: data.data,
          current_page: data.current_page,
          count_pages: data.last_page,
          total: data.total,
        },
      });
    } catch (err: any) {
      console.log(err);
    }
  };

export const AddProduct =
  (product: IProductItem) => async (dispatch: Dispatch<ProductActions>) => {
    try {
      const resp = await http.post("/api/products", product);
      console.log(resp);
      const { data } = resp;

      dispatch({
        type: ProductActionTypes.ADD_PRODUCT,
      });
    } catch (err: any) {
      console.log(err);
    }
  };

export const DeleteProduct =
  (productId: string) => async (dispatch: Dispatch<ProductActions>) => {
    try {
      const resp = await http.delete<IProductResponse>(
        `/api/products/${productId}`
      );
      console.log(resp);
      const { data } = resp;
      dispatch({
        type: ProductActionTypes.DELETE_PRODUCT,
      });
    } catch (err: any) {
      console.log(err);
    }
  };
