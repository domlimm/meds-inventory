import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import {
  Button,
  Input,
  Select,
  Icon,
  Spinner,
  SelectItem,
  IndexPath,
  Calendar,
  Text,
  Layout,
  TopNavigation
} from '@ui-kitten/components';
import { useDispatch } from 'react-redux';

import { drugTypes, drugMeasurements } from '../../constants/drugType';
import AddMedicineImage from '../../components/AddMedicineImage';
import * as medActions from '../../store/actions/medicine';

const AddMedicine = (props) => {
  const dispatch = useDispatch();

  const [medName, setMedName] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const [amount, setAmount] = useState('');
  const [expiryDate, setExpiryDate] = useState(null);
  const [imagePath, setImagePath] = useState();
  const [remarks, setRemarks] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const drugType = drugTypes[selectedIndex.row];

  useEffect(() => {
    if (error) {
      Alert.alert('Error Occured', error, [{ text: 'Close' }]);
    }
  }, [error]);

  const medNameChangeHandler = (value) => {
    setMedName(value);
  };

  const imageChangeHandler = (imagePath) => {
    setImagePath(imagePath);
  };

  const renderSelectItem = (title) => <SelectItem key={title} title={title} />;

  const amtHandler = (amt) => {
    setAmount(amt.toString());
  };

  const remarksChangeHandler = (remarks) => {
    setRemarks(remarks);
  };

  const addMedicineHandler = async () => {
    let dosage = {
      type: drugType,
      amount: amount.toString(),
      unit: drugMeasurements[drugType]
    };

    try {
      setIsLoading(true);
      setError(null);

      await dispatch(
        medActions.addMedicine(
          medName,
          expiryDate.toLocaleDateString('en-GB'),
          dosage,
          imagePath,
          remarks
        )
      );
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }

    clearInputs();
    props.navigation.goBack();
    // Amend to snackbar?
    Alert.alert('Success', 'Added Medicine', [{ text: 'Okay' }]);
  };

  const closeHandler = () => {
    clearInputs();
    props.navigation.goBack();
  };

  const clearInputs = () => {
    setMedName('');
    setExpiryDate(null);
    setImagePath(null);
    setRemarks('');
    setAmount('');
    setIsLoading(false);
  };

  const CalendarIcon = () => <Icon name='calendar' />;

  const tDate = new Date();
  const maxDate = new Date(
    tDate.getFullYear() + 5,
    tDate.getMonth(),
    tDate.getDay()
  );

  const LoadingIndicator = () => (
    <View>
      <Spinner size='small' />
    </View>
  );

  const InputLabel = (props) => (
    <Text style={[styles.inputLabel, props.style]}>{props.title}</Text>
  );

  return (
    <Layout>
      <KeyboardAvoidingView style={styles.addMedicineView}>
        <ScrollView>
          <TopNavigation alignment='center' title='ADD MEDICINE' />
          <View style={styles.addSV}>
            <View style={styles.inputContainer}>
              <Input
                label={<InputLabel title='Medicine Name' />}
                value={medName}
                onChangeText={medNameChangeHandler}
                style={styles.input}
                autoFocus={true}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 0.7, marginRight: 5, marginTop: 2 }}>
                <Select
                  label={<InputLabel title='Type' />}
                  onSelect={(index) => setSelectedIndex(index)}
                  selectedIndex={selectedIndex}
                  caption='Per single consumption (Amount)'
                  value={drugType}
                >
                  {drugTypes.map(renderSelectItem)}
                </Select>
              </View>
              <View style={{ flex: 0.3 }}>
                <Input
                  label={<InputLabel title='Amount' />}
                  keyboardType='numeric'
                  value={amount}
                  onChangeText={amtHandler}
                  returnKeyType='next'
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <InputLabel style={{ marginBottom: 8 }} title='Expiry Date' />
              <Calendar
                date={expiryDate}
                onSelect={setExpiryDate}
                icon={CalendarIcon}
                backdropStyle={styles.backdrop}
                min={new Date()}
                max={maxDate}
              />
            </View>
            <View style={styles.inputContainer}>
              <AddMedicineImage
                loading={isLoading}
                setImage={imageChangeHandler}
              />
            </View>
            <View style={styles.inputContainer}>
              <Input
                label={<InputLabel title='Additional Remarks' />}
                value={remarks}
                onChangeText={remarksChangeHandler}
                style={styles.input}
                multiline
                numberOfLines={5}
              />
            </View>
            <View style={styles.btnContainer}>
              <View style={styles.btn}>
                <Button
                  status='success'
                  onPress={addMedicineHandler}
                  accessoryLeft={isLoading ? () => <LoadingIndicator /> : null}
                >
                  {isLoading ? 'LOADING' : 'SAVE'}
                </Button>
              </View>
              <View style={styles.btn}>
                <Button status='danger' onPress={closeHandler}>
                  CLOSE
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  addMedicineView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  addSV: {
    width: Dimensions.get('window').width * 0.9,
    paddingHorizontal: 8
  },
  inputContainer: {
    marginVertical: 10
  },
  btnContainer: {
    marginVertical: 12,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  btn: {
    marginHorizontal: 5,
    flex: 0.5
  },
  inputLabel: {
    fontSize: 14,
    color: '#070D0D'
  }
});

export default AddMedicine;
