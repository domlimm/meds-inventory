import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Spinner, Text } from '@ui-kitten/components';

const ProcessingScreen = props => {
  return (
    <View style={styles.screen}>
      <Text style={styles.text} status='primary'>
        Processing...
      </Text>
      <Spinner />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    marginBottom: 5
  }
});

export default ProcessingScreen;
