import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from 'src/shared/reducers/action-type.util';
import { defaultValue as defaultUser } from 'src/shared/model/user.model';
import { strapiUrl } from './api-urls';
import { AUTH_TOKEN_KEY } from 'src/config/constans';

export const ACTION_TYPES = {
  LOGIN: 'authentication/LOGIN',
  LOGOUT: 'authentication/LOGOUT',
  REGISTER: 'authentication/REGISTER',
  GET_USER_INFORMATION: 'authentication/USER',
  ERROR_MESSAGE: 'authentication/ERROR_MESSAGE'
};

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
        idToken: action.payload.data.jwt,
        isAuthenticated: true
      };
    case REQUEST(ACTION_TYPES.REGISTER):
      return {
        ...state,
        loading: true
      };
    case FAILURE(ACTION_TYPES.REGISTER):
      return {
        ...initialState,
        errorMessage: action.payload,
        loginError: true
      };
    case SUCCESS(ACTION_TYPES.REGISTER):
      return {
        ...state,
        loading: false,
        loginError: false,
        loginSuccess: true,
        user: action.payload.data.user,
        idToken: action.payload.data.jwt,
        isAuthenticated: true
      };
    case REQUEST(ACTION_TYPES.GET_USER_INFORMATION):
      return {
        ...state,
        loading: true
      };
    case FAILURE(ACTION_TYPES.GET_USER_INFORMATION):
      return {
        ...initialState,
        errorMessage: action.payload,
        isAuthenticated: false
      };
    case SUCCESS(ACTION_TYPES.GET_USER_INFORMATION):
      return {
        ...state,
        loading: false,
        user: action.payload.data
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
    payload: axios.post(`${strapiUrl}auth/local`, { identifier, password })
  };

  return result;
};

export const loginProvider = (provider, search) => {
  return {
    type: ACTION_TYPES.LOGIN,
    payload: axios.get(`${strapiUrl}auth/${provider}/callback${search}`)
  }
}

export const register = (username, password, email) => {
  const result = {
    type: ACTION_TYPES.REGISTER,
    payload: axios.post(`${strapiUrl}auth/local/register`, { username, password, email })
  };

  return result;
};

export const getMe = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY) || sessionStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) {
    return {
      type: ACTION_TYPES.GET_USER_INFORMATION,
      payload: 'Not authenticated!'
    }
  } else {
    return {
      type: ACTION_TYPES.GET_USER_INFORMATION,
      payload: axios.get(`${strapiUrl}users/me`, { headers: { 'Authorization': `Bearer ${token}` } })
    }
  }
}

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
