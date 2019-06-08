import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  LOGOUT_USER,
  CHECK_AUTH,
  STORE_USER,
} from "../../Constants/actionTypes";
import Http from '../../util/Http'

const INIT_STATE = {
  user: null,
  loading: false,
  access_token: localStorage.getItem("access_token") === "undefined" ? null : localStorage.getItem("access_token"),
  authenticated: localStorage.getItem("access_token") === "undefined" ? false : true,
};

const merge = (state, newState) => {
  return Object.assign({}, state, newState)
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESS:
      //notify.success('Login Success');
      return { ...state, loading: false, user: action.payload };
    case REGISTER_USER:
      return { ...state, loading: true };
    case REGISTER_USER_SUCCESS:
      //notify.success('Register User Success');
      return { ...state, loading: false, user: action.payload };
    case LOGOUT_USER:
      localStorage.removeItem('access_token')
      return { ...state, user: null, authenticated: false, access_token: null };
    case CHECK_AUTH:
      state = merge(state, { authenticated: !!localStorage.getItem('access_token') })

      if (state.access_token) {
        Http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
      }
      return state;
    case STORE_USER:
		return merge(state, { user: action.payload} );
    default:
      return { ...state };
  }
};
