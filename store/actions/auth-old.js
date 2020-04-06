import { AsyncStorage } from 'react-native';
import * as userActions from './user';

import ENV from '../../utils/env';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const TRIED_LOGIN = 'TRIED_LOGIN';

let timer;

export const triedLogin = () => {
  return { type: TRIED_LOGIN };
};

export const auth = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const sign_up = (email, pw, name) => {
  let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
    ENV().firebaseConfig.apiKey
  }`;

  return async dispatch => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: pw,
        returnSecureToken: true
      })
    });

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error['message'];
      console.log(errorResData);
      let message = 'Please check your inputs!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'Account already exists!';
      } else if (errorId.indexOf('WEAK_PASSWORD') >= 0) {
        message = 'Requires stronger password!';
      }
      throw new Error(message);
    } else {
      const resData = await response.json();
      dispatch(
        auth(
          resData.localId,
          resData.idToken,
          parseInt(resData.expiresIn) * 1000
        )
      );
      dispatch(userActions.addUser(resData.localId, name));
      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000
      );
      saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    }
  };
};

export const login = (email, pw) => {
  let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
    ENV().firebaseConfig.apiKey
  }`;

  return async dispatch => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: pw,
        returnSecureToken: true
      })
    });

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error['message'];

      let message = 'Please check your inputs!';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'Account could not be found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'Password invalid!';
      }
      throw new Error(message);
    } else {
      const resData = await response.json();
      dispatch(
        auth(
          resData.localId,
          resData.idToken,
          parseInt(resData.expiresIn) * 1000
        )
      );
      dispatch(userActions.getUserInfo());
      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000
      );
      saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    }
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString()
    })
  );
};
