import React, { useState, useEffect, useRef } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Drawer, DrawerItem, Icon, Button, Text, Layout, IndexPath } from '@ui-kitten/components';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import firebase from '../firebase';

import AuthScreen from '../screens/user/AuthScreen';
import ScheduleScreen from '../screens/main/ScheduleScreen';
import HistoryScreen from '../screens/main/HistoryScreen';
import MedicationScreen from '../screens/main/MedicationScreen';
import StartupScreen from '../screens/user/StartupScreen';
import AddMedicineScreen from '../screens/main/AddMedicine';
import MedicineDetailScreen from '../screens/main/MedicineDetailScreen';
import { logout } from '../store/actions/auth';

const InfoIcon = props => <Icon {...props} name='shopping-bag-outline' />;

const ScheduleIcon = props => <Icon {...props} name='calendar-outline' />;

const HistoryIcon = props => <Icon {...props} name='checkmark-square-outline' />;

const LogoutIcon = props => <Icon {...props} name='log-out' />;

const Header = () => {
  const name = useSelector(state => state.auth.name);
  return (
    <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
      <Text category='s1' style={{ marginBottom: 4 }}>{`Hello, ${name}!`}</Text>
      <Text category='c1'>What would you like to do today?</Text>
    </Layout>
  );
};

const DrawerContent = ({ navigation, state }) => {
  const selectedIndex = new IndexPath(state.index);

  if (state.routes[state.index] === 'MedicineAdd') {
    StatusBar.setBackgroundColor('#74ADA2');
    StatusBar.setBarStyle('dark-content');
  } else {
    StatusBar.setBackgroundColor('#FFFFFF');
    StatusBar.setBarStyle('dark-content');
  }

  return (
    <SafeAreaView style={styles.customDrawer}>
      <Drawer
        onSelect={index => navigation.navigate(state.routeNames[index.row])}
        selectedIndex={selectedIndex}
        header={() => <Header />}
      >
        <DrawerItem title='MEDICATION' accessoryLeft={InfoIcon} />
        <DrawerItem title='SCHEDULE' accessoryLeft={ScheduleIcon} />
        <DrawerItem title='HISTORY' accessoryLeft={HistoryIcon} />
      </Drawer>
      <View style={styles.btnView}>
        <Button
          accessoryLeft={LogoutIcon}
          style={styles.logoutBtn}
          onPress={() => {
            navigation.closeDrawer();
            logout();
          }}
        >
          LOGOUT
        </Button>
      </View>
    </SafeAreaView>
  );
};

const DrawerNav = createDrawerNavigator();
const MedicineSideStack = createStackNavigator();

const MedicineSide = () => (
  <MedicineSideStack.Navigator initialRouteName='MedicineMain' headerMode='none'>
    <MedicineSideStack.Screen name='MedicineMain' component={MedicationScreen} />
    <MedicineSideStack.Screen
      name='MedicineAdd'
      component={AddMedicineScreen}
      options={{ unmountOnBlur: true }}
    />
    <MedicineSideStack.Screen name='MedicineDetail' component={MedicineDetailScreen} />
  </MedicineSideStack.Navigator>
);

const DrawerNavigator = () => (
  <DrawerNav.Navigator drawerContent={props => <DrawerContent {...props} />}>
    <DrawerNav.Screen name='Medication' component={MedicineSide} />
    <DrawerNav.Screen name='Schedule' component={ScheduleScreen} />
    <DrawerNav.Screen name='History' component={HistoryScreen} />
  </DrawerNav.Navigator>
);

const AuthStackNavigator = createStackNavigator();

const AuthNavigator = () => (
  <AuthStackNavigator.Navigator headerMode='none'>
    <AuthStackNavigator.Screen name='Auth' component={AuthScreen} />
  </AuthStackNavigator.Navigator>
);

export default AppNavigator = () => {
  const [isAuth, setAuth] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const authHandler = () => {
    setLoading(true);
    return firebase.auth().onAuthStateChanged(user => {
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
