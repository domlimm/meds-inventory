import React from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView, Dimensions } from 'react-native';
import { Text, Layout, Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

const { height, width } = Dimensions.get('window');

const AddRefillScreen = props => {
  const CloseIcon = props => <Icon {...props} name='close-outline' />;

  const renderBackAction = () => (
    <TopNavigationAction icon={CloseIcon} onPress={() => props.navigation.goBack()} />
  );

  const InputLabel = props => <Text style={[styles.inputLabel, props.style]}>{props.title}</Text>;

  return (
    <Layout style={styles.screen}>
      <TopNavigation title='CONFIGURE REFILL' alignment='center' accessoryLeft={renderBackAction} />
      <ScrollView>
        <KeyboardAvoidingView>
          <Layout style={styles.elementsView}>
            <Text>Add Refill</Text>
          </Layout>
        </KeyboardAvoidingView>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  elementsView: {
    width: width * 0.9,
    paddingHorizontal: 8
  },
  inputContainer: {
    marginVertical: 10
  },
  inputLabel: {
    fontSize: 14
  }
});

export default AddRefillScreen;
