import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from 'src/shared/reducers/action-type.util';
import { defaultValue as defaultUser } from 'src/shared/model/user.model';

export const ACTION_TYPES = {
  LOGIN: 'authentication/LOGIN',
  LOGOUT: 'authentication/LOGOUT',
  ERROR_MESSAGE: 'authentication/ERROR_MESSAGE'
};

const AUTH_TOKEN_KEY = 'actool-authenticationToken';

const initialState = {
  loading: false,
  isAuthenticated: false,
  loginSuccess: false,
  loginError: false, // Errors returned from server side
  errorMessage: '', // Errors returned from server side
  redirectMessage: '',
  idToken: '',
  logoutUrl: '',
  user: defaultUser
};

export type AuthenticationState = Readonly<typeof initialState>;

// Reducer

export default (state: AuthenticationState = initialState, action): AuthenticationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.LOGIN):
      return {
        ...state,
        loading: true
      };
    case FAILURE(ACTION_TYPES.LOGIN):
      return {
        ...initialState,
        errorMessage: action.payload,
        loginError: true
      };
    case SUCCESS(ACTION_TYPES.LOGIN):
      return {
        ...state,
        loading: false,
        loginError: false,
        loginSuccess: true,
        user: action.payload.data.user,
        idToken: action.payload.data.jwt
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...initialState
      };
    case ACTION_TYPES.ERROR_MESSAGE:
      return {
        ...initialState,
        redirectMessage: action.message
      };
    default:
      return state;
  }
};

export const login = (identifier, password) => {
  const result = {
    type: ACTION_TYPES.LOGIN,
    payload: axios.post('http://localhost:1337/auth/local', { identifier, password })
  };

  return result;
};

export const clearAuthToken = () => {
  if (localStorage.getItem(AUTH_TOKEN_KEY)) {
    localStorage.remove(AUTH_TOKEN_KEY);
  }
  if (sessionStorage.getItem(AUTH_TOKEN_KEY)) {
    sessionStorage.remove(AUTH_TOKEN_KEY);
  }
};

export const clearReportFilterCriteria = (username: string) => {
  if (sessionStorage.getItem(`report-${username}`)) {
    sessionStorage.remove(`report-${username}`);
  }
};

export const logout = (username: string) => dispatch => {
  clearAuthToken();
  clearReportFilterCriteria(username);
  dispatch({
    type: ACTION_TYPES.LOGOUT
  });
};
