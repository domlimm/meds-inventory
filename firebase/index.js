import ENV from '../utils/env';
import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

if (firebase.apps.length === 0) {
  firebase.initializeApp(ENV().firebaseConfig);
}

export default firebase;
