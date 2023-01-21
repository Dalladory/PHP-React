import { ProductActionTypes, ProductActions, ProductState } from "./types";

const initialState: ProductState = {
  list: [],
  current_page: 0,
  count_pages: 0,
  total: 0,
};

export const productReducer = (
  state = initialState,
  action: ProductActions
): ProductState => {
  switch (action.type) {
    case ProductActionTypes.PRODUCT_LIST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case ProductActionTypes.ADD_PRODUCT: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case ProductActionTypes.DELETE_PRODUCT: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return { ...state };
  }
};
