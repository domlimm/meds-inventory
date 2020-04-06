import { USER_DATA } from '../actions/user';
import User from '../../models/User';

const initialState = {
  new_user: true,
  name: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      const userData = new User(
        action.userData[0].id,
        action.userData[0].name,
        action.userData[0].newlyCreated
      );
      return {
        new_user: userData.newlyCreated,
        name: userData.name
      };
    default:
      return state;
  }
};
