import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Image } from 'react-native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import './firebase';
import { default as baseTheme } from './utils/custom-theme.json';
import { default as customMapping } from './utils/custom-mapping.json';
import { AntDesignIconsPack } from './utils/ant-design-icons';
import AppNavigator from './navigation/AppNavigator';
import authReducer from './store/reducers/auth';
import medReducer from './store/reducers/medicine';
import { localImages } from './constants/drugType';

const rootReducer = combineReducers({
  auth: authReducer,
  medicine: medReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    montserrat: require('./assets/fonts/Montserrat-Regular.ttf')
  });
};

const fetchImages = images => {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

export default function App() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  console.disableYellowBox = true;

  const loadAssetsAsync = async () => {
    await fetchImages([...localImages]);
    await fetchFonts();
  };

  if (!assetsLoaded) {
    return (
      <AppLoading
        startAsync={loadAssetsAsync}
        onFinish={() => {
          setAssetsLoaded(true);
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
        theme={{ ...eva.light, ...baseTheme }}
      >
        <AppNavigator />
      </ApplicationProvider>
    </Provider>
  );
}
