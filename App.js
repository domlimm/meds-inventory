import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

// init firebase
import './firebase';

import { default as customMapping } from './utils/custom-mapping.json';
import { AntDesignIconsPack } from './utils/ant-design-icons';
import AppNavigator from './navigation/AppNavigator';
import authReducer from './store/reducers/auth';
import userReducer from './store/reducers/user';
import medReducer from './store/reducers/medicine';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  medicine: medReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  console.disableYellowBox = true;

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <IconRegistry icons={[EvaIconsPack, AntDesignIconsPack]} />
      <ApplicationProvider
        {...eva}
        customMapping={customMapping}
        theme={eva.light}
      >
        <AppNavigator />
      </ApplicationProvider>
    </Provider>
  );
}
