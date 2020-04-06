import firebase from '../../firebase';

export const GET_USER = 'GET_USER';
export const IS_VALID_USER = 'IS_VALID_USER';
// export const TRIED_LOGIN = 'TRIED_LOGIN'

export const authenticate = (token) => {
  return (dispatch) => {
    dispatch({ type: IS_VALID_USER, token: token });
  };
};

export const signup = (email, pw, name) => {
  let signupResponse;

  return async (dispatch) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, pw)
      .then((res) => {
        signupResponse = res.user;

        firebase
          .auth()
          .currentUser.updateProfile({ displayName: name })
          .then(() => {
            firebase
              .database()
              .ref('users/' + signupResponse.uid)
              .set({
                id: signupResponse.uid,
                emailUsername: signupResponse.email,
                name: signupResponse.displayName,
                newUser: true,
              })
              .then(() => {
                dispatch({
                  type: GET_USER,
                  user: signupResponse.displayName,
                });
              })
              .catch((err) => console.log('err.message', err.message));
          });
      })
      .catch((err) => {
        let message = 'An error has occured!';

        if (err.code === 'auth/email-already-in-use') {
          message = 'Found an account with the same email address!';
        } else if (err.code === 'auth/invalid-email') {
          message = 'Invalid email address!';
        } else if (err.code === 'auth/weak-password') {
          message = 'Password is not strong enough!';
        }

        throw new Error(message);
      });
  };
};

export const login = (email, pw) => {
  return async (dispatch) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, pw)
      .then(() => {
        const userId = firebase.auth().currentUser.uid;
        firebase
          .database()
          .ref('/users/' + userId)
          .once('value')
          .then((snapshot) => {
            const data = snapshot.val();
            dispatch({ type: GET_USER, user: data.name });
          })
          .catch((err) => console.log('err.message', err.message));
      })
      .catch((err) => {
        let message = 'An error has occured!';

        if (err.code === 'auth/invalid-email') {
          message = 'Invalid email address!';
        } else if (err.code === 'auth/user-not-found') {
          message = 'No account with such credentials!';
        } else if (err.code === 'auth/wrong-password') {
          message = 'Incorrect password! Try again.';
        }

        throw new Error(message);
      });
  };
};

export const logout = () => {
  firebase.auth().signOut();
};
