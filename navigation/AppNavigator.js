import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Drawer as UIKittenDrawer,
  DrawerItem,
  Icon,
  Button,
  Text,
  Layout,
  Divider
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

const InfoIcon = (props) => <Icon {...props} name='person-outline' />;

const ScheduleIcon = (props) => <Icon {...props} name='calendar-outline' />;

const HistoryIcon = (props) => (
  <Icon {...props} name='checkmark-square-outline' />
);

const LogoutIcon = (props) => <Icon {...props} name='log-out' />;

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

const Header = () => {
  const name = useSelector((state) => state.auth.name);
  return (
    <Layout level='3' style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
      <Text category='s1' style={{ marginBottom: 4 }}>{`Hello, ${name}`}</Text>
      <Text category='c1'>What would you like to do today?</Text>
      <Divider />
    </Layout>
  );
};

const DrawerContent = ({ navigation, state }) => (
  <SafeAreaView style={styles.customDrawer}>
    <UIKittenDrawer
      onSelect={(index) => navigation.navigate(state.routeNames[index.row])}
      selectedIndex={state.index}
      header={() => <Header />}
    >
      <DrawerItem title='MEDICINE' accessoryLeft={InfoIcon} />
      <DrawerItem title='SCHEDULE' accessoryLeft={ScheduleIcon} />
      <DrawerItem title='HISTORY' accessoryLeft={HistoryIcon} />
    </UIKittenDrawer>
    <View style={styles.btnView}>
      <Button
        accessoryLeft={LogoutIcon}
        style={styles.logoutBtn}
        onPress={logout}
      >
        LOGOUT
      </Button>
    </View>
  </SafeAreaView>
);

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

  console.log('isLoading', isLoading, 'isAuth', isAuth);

  return (
    <NavigationContainer>
      {isAuth && !isLoading ? (
        <DrawerNavigator />
      ) : !isAuth & !isLoading ? (
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
