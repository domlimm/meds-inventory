import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HistoryScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>History Screen History Screen</Text>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'History',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HistoryScreen;
