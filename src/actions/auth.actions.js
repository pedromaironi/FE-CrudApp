const AUTH_API_URL = 'http://34.19.106.52/auth/login';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (token) => ({ type: LOGIN_SUCCESS, payload: token });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (username, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await fetch(AUTH_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      dispatch(loginSuccess(data.token));
    } else {
      dispatch(loginFailure(data.message));
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};