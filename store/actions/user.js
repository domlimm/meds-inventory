import User from '../../models/User';

export const USER_DATA = 'USER_DATA';

export const updateUserInfo = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    let url = `https://my-medicine-tracker.firebaseio.com/users/${userId}.json?auth=${token}`;

    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        newlyCreated: 'false'
      })
    })
      .then(response => {
        return response.json();
      })
      .then(resData => {
        console.log('Updated new user to false');
      });
  };
};

export const addUser = (userId, name) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    let url = `https://my-medicine-tracker.firebaseio.com/users/${userId}.json?auth=${token}`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        givenName: name,
        newlyCreated: true
      })
    })
      .then(response => {
        return response.json();
      })
      .then(resData => {
        const user = [];

        for (const key in resData) {
          user.push(
            new User(key, resData[key].givenName, resData[key].newlyCreated)
          );
        }

        dispatch({ type: USER_DATA, userData: user });
      });
  };
};

export const getUserInfo = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    let url = `https://my-medicine-tracker.firebaseio.com/users/${userId}.json?auth=${token}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          console.log('response', response);
        } else {
          return response.json();
        }
      })
      .then(resData => {
        const user = [];

        for (const key in resData) {
          user.push(
            new User(key, resData[key].givenName, resData[key].newlyCreated)
          );
        }

        dispatch({ type: USER_DATA, userData: user });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
