import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Drawer as UIKittenDrawer,
  Icon,
  DrawerHeaderFooter,
  Button
} from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import firebase from '../firebase';

import AuthScreen from '../screens/user/AuthScreen';
import ScheduleScreen from '../screens/main/ScheduleScreen';
import HistoryScreen from '../screens/main/HistoryScreen';
import MedicineScreen from '../screens/main/MedicineScreen';
import StartupScreen from '../screens/user/StartupScreen';
import { logout } from '../store/actions/auth';

const InfoIcon = () => <Icon name='person-outline' />;

const ScheduleIcon = () => <Icon name='calendar-outline' />;

const HistoryIcon = () => <Icon name='checkmark-square-outline' />;

const LogoutIcon = () => <Icon name='log-out' />;

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? '#3366FF' : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : '#ccc'
};

const drawerData = [
  { title: 'MEDICINE', icon: InfoIcon },
  { title: 'SCHEDULE', icon: ScheduleIcon },
  { title: 'HISTORY', icon: HistoryIcon }
];

const Header = () => {
  const name = useSelector((state) => state.auth.name);
  return (
    <DrawerHeaderFooter
      title={name}
      description='What would you like to do today?'
    />
  );
};

const DrawerContent = ({ navigation, state }) => {
  const onSelect = (index) => {
    navigation.navigate(state.routeNames[index]);
  };

  return (
    <SafeAreaView style={styles.customDrawer}>
      <UIKittenDrawer
        data={drawerData}
        onSelect={onSelect}
        selectedIndex={state.index}
        header={() => <Header />}
      />
      <View style={styles.btnView}>
        <Button icon={LogoutIcon} style={styles.logoutBtn} onPress={logout}>
          LOGOUT
        </Button>
      </View>
    </SafeAreaView>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={defaultNavOptions}
    drawerContent={(props) => <DrawerContent {...props} />}
    initialRouteName='Medicine'
    backBehavior='order'
  >
    <Drawer.Screen name='Medicine' component={MedicineScreen} />
    <Drawer.Screen name='Schedule' component={ScheduleScreen} />
    <Drawer.Screen name='History' component={HistoryScreen} />
  </Drawer.Navigator>
);

const AuthStackNavigator = createStackNavigator();

const AuthNavigator = () => (
  <AuthStackNavigator.Navigator
    headerMode='none'
    screenOptions={defaultNavOptions}
  >
    <AuthStackNavigator.Screen name='Auth' component={AuthScreen} />
  </AuthStackNavigator.Navigator>
);

export default AppNavigator = () => {
  const [isAuth, setAuth] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const new_user = useSelector((state) => state.user.new_user);

  const authHandler = () => {
    setLoading(true);
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuth(true);
        setLoading(false);
      } else {
        setAuth(false);
        setLoading(false);
        logout();
      }
    });
  };

  useEffect(() => {
    const unsubscribe = authHandler();
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      {isAuth && !isLoading ? (
        <DrawerNavigator />
      ) : !isAuth ? (
        <AuthNavigator />
      ) : (
        <StartupScreen />
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  customDrawer: {
    flex: 1
  },
  btnView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20
  },
  logoutBtn: {
    width: '80%'
  }
});
