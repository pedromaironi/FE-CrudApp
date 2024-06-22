import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT
} from '../actions/product.actions';

const initialState = {
  products: [],
  loading: false,
  error: null
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case FETCH_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    case EDIT_PRODUCT:
      return {
        ...state,
        products: state.products.map(product =>
          product._id === action.payload._id ? action.payload : product
        )
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => product._id !== action.payload)
      };
    default:
      return state;
  }
};

export default productReducer;