const API_URL = 'http://localhost:4000/products'; 

export const fetchProducts = async (dispatch, token) => {
  dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
  try {
    const response = await fetch(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
  }
};

export const addProduct = async (dispatch, product, token) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    dispatch({ type: 'ADD_PRODUCT', payload: data });
  } catch (error) {
    console.error('Error adding product:', error);
  }
};

export const editProduct = async (dispatch, product, token) => {
  try {
    const response = await fetch(`${API_URL}/${product._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    dispatch({ type: 'EDIT_PRODUCT', payload: data });
  } catch (error) {
    console.error('Error editing product:', error);
  }
};

export const deleteProduct = async (dispatch, productId, token) => {
  try {
    await fetch(`${API_URL}/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    dispatch({ type: 'DELETE_PRODUCT', payload: productId });
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};