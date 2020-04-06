import { AUTHENTICATE, LOGOUT, TRIED_LOGIN } from '../actions/auth-old';

const initialState = {
  token: null,
  userId: null,
  triedLogin: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        triedLogin: true
      };
    case TRIED_LOGIN:
      return {
        ...state,
        triedLogin: true
      };
    case LOGOUT:
      return {
        ...initialState,
        triedLogin: true
      };
    default:
      return state;
  }
};
