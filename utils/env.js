const variables = {
    development: {
      firebaseConfig: {
        apiKey: '',
        authDomain: '',
        databaseURL: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: '',
        measurementId: ''
      }
    },
    production: {
      googleApiKey: ''
    }
  };
  
  const getEnvVariables = () => {
    // export a reference to the function
    if (__DEV__) {
      return variables.development; // return this if in development mode
    }
    return variables.production; // otherwise, return this
  };
  
  export default getEnvVariables;
  