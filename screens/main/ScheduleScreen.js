import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ScheduleScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Schedule Screen Schedule Screen</Text>
    </View>
  );
};

export const screenOptions = {
  headerTitle: 'Medicine Schedule',
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ScheduleScreen;
