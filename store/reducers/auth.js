import { GET_USER, IS_VALID_USER } from '../actions/auth';

const initialState = {
  token: '',
  name: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        name: action.user,
      };
    case IS_VALID_USER:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
};
