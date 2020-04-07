import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { Button, Input, Icon, Text } from '@ui-kitten/components';
import { useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import * as authActions from '../../store/actions/auth';

const { height } = Dimensions.get('window');

const AuthScreen = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (error) {
      Alert.alert('Error Occured', error, [{ text: 'Close' }]);
    }
  }, [error]);

  const authHandler = async () => {
    try {
      let action;

      if (isLogin) {
        action = authActions.login(email, password);
      } else {
        action = authActions.signup(email, password, name);
      }
      setError(null);
      setIsLoading(true);

      await dispatch(action);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const reviewPassword = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  // UI/UX
  const renderEmailIcon = () => <Icon name='email-outline' />;

  const renderPersonIcon = () => <Icon name='person-outline' />;

  const renderPWIcon = () => (
    <Icon name={secureTextEntry ? 'eye-off' : 'eye'} />
  );

  const nameInput = (
    <Input
      label='Name'
      style={styles.textInput}
      placeholder='Enter your Name'
      autoCompleteType='off'
      autoCapitalize='words'
      value={name}
      icon={renderPersonIcon}
      onChangeText={(text) => setName(text)}
      labelStyle={styles.inputLabel}
    />
  );

  return (
    <KeyboardAvoidingView style={styles.formContainer}>
      <ScrollView>
        <View style={styles.authContainer}>
          <View style={styles.greetingContainer}>
            <Text category='h6' status='primary'>
              {isLogin ? 'LOGIN' : 'SIGN UP'}
            </Text>
            <Text category='s2'>
              {isLogin
                ? 'Welcome back!'
                : 'Start tracking your medicine schedule!'}
            </Text>
          </View>
          {!isLogin && nameInput}
          <Input
            label='Email'
            placeholder='Enter your E-mail'
            style={styles.textInput}
            keyboardType='email-address'
            autoCompleteType='off'
            onChangeText={(text) => setEmail(text)}
            value={email}
            autoCapitalize='none'
            icon={renderEmailIcon}
            labelStyle={styles.inputLabel}
          />
          <Input
            label='Password'
            placeholder='Enter your Password'
            style={styles.textInput}
            autoCompleteType='off'
            onChangeText={(text) => setPassword(text)}
            value={password}
            autoCapitalize='none'
            secureTextEntry={secureTextEntry}
            onIconPress={reviewPassword}
            icon={renderPWIcon}
            labelStyle={styles.inputLabel}
          />
          <View style={styles.buttons}>
            <View style={styles.buttonContainer}>
              <Button
                size='small'
                style={styles.button}
                status='basic'
                onPress={authHandler}
                icon={isLoading ? () => <ActivityIndicator /> : null}
              >
                {isLoading ? null : 'PROCEED'}
              </Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                size='small'
                onPress={() => {
                  setIsLogin((prevState) => !prevState);
                  setEmail('');
                  setPassword('');
                  setName('');
                }}
                style={styles.button}
              >
                {isLogin ? 'SIGN UP' : 'LOGIN'}
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height < 560 ? '90%' : height * 0.9
  },
  greetingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  textInput: {
    width: '80%',
    marginVertical: 4
  },
  buttons: {
    justifyContent: 'flex-end',
    width: '80%',
    marginTop: 10
  },
  buttonContainer: {
    marginTop: 8
  },
  inputLabel: {
    color: '#070D0D'
  }
});

export default AuthScreen;
