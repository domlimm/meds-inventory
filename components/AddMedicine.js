import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator
} from 'react-native';
import {
  Button,
  Input,
  Datepicker,
  Select,
  Icon,
  Tooltip,
  Layout
} from '@ui-kitten/components';
import { PopoverPlacements } from '@ui-kitten/components/ui/popover/type';
import { useDispatch } from 'react-redux';

import { drugTypes, drugMeasurements } from '../constants/drugType';
import AddMedicineImage from '../components/AddMedicineImage';
import * as medActions from '../store/actions/medicine';

const AddMedicine = (props) => {
  const dispatch = useDispatch();

  const [medName, setMedName] = useState('');
  const [drugType, setDrugType] = useState(null);
  const [unitType, setUnitType] = useState('-');
  const [amount, setAmount] = useState('');
  const [expiryDate, setExpiryDate] = useState(null);
  const [imagePath, setImagePath] = useState();
  const [remarks, setRemarks] = useState('');
  const [dosageTooltip, setDosageTooltip] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const drugTypeHandler = (type) => {
    setDrugType(type);

    let unit;
    unit = drugMeasurements[type.text];
    setUnitType(unit);
  };

  const amtHandler = (amt) => {
    setAmount(amt.toString());
  };

  const remarksChangeHandler = (remarks) => {
    setRemarks(remarks);
  };

  const addMedicineHandler = async () => {
    let dosage = {
      type: drugType.text,
      amount: amount.toString(),
      unit: unitType
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
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }

    props.show();
    Alert.alert('Complete', 'Yay', [{ text: 'Ok lol' }]);
  };

  const closeHandler = () => {
    setMedName('');
    setExpiryDate(null);
    setDrugType(null);
    setImagePath(null);
    setRemarks('');
    props.show();
  };

  const toggleDosageTooltip = () => {
    setDosageTooltip(!dosageTooltip);
  };

  const CalendarIcon = () => <Icon name='calendar' />;

  const DosageIcon = () => <Icon name='info-outline' fill='#8b0000' />;

  const tDate = new Date();
  const maxDate = new Date(
    tDate.getFullYear() + 5,
    tDate.getMonth(),
    tDate.getDay()
  );

  return (
    <KeyboardAvoidingView style={styles.addMedicineView}>
      <ScrollView>
        <View style={styles.addSV}>
          <View style={styles.inputContainer}>
            <Input
              label='Medicine Name'
              value={medName}
              onChangeText={medNameChangeHandler}
              labelStyle={styles.inputLabel}
              style={styles.input}
              autoFocus={true}
            />
          </View>
          <Tooltip
            visible={dosageTooltip}
            placement={PopoverPlacements.RIGHT}
            text='Per single consumption'
            onBackdropPress={toggleDosageTooltip}
          >
            <Button
              appearance='outline'
              style={{ marginBottom: 8, width: '35%' }}
              size='small'
              icon={DosageIcon}
              status='warning'
              onPress={toggleDosageTooltip}
            >
              DOSAGE
            </Button>
          </Tooltip>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 0.6, marginRight: 5, marginTop: 2 }}>
              <Select
                label='Type'
                labelStyle={styles.inputLabel}
                data={drugTypes}
                selectedOption={drugType}
                onSelect={(type) => drugTypeHandler(type)}
                placeholder='Medicine Type'
              />
            </View>
            <View style={{ flex: 0.2, marginRight: 5 }}>
              <Input
                label='Amount'
                labelStyle={styles.inputLabel}
                keyboardType='numeric'
                value={amount}
                onChangeText={amtHandler}
                returnKeyType='next'
              />
            </View>
            <View style={{ flex: 0.2 }}>
              <Input
                disabled
                label='Unit'
                labelStyle={styles.inputLabel}
                value={unitType}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Datepicker
              date={expiryDate}
              onSelect={setExpiryDate}
              icon={CalendarIcon}
              backdropStyle={styles.backdrop}
              label='Expiry Date'
              labelStyle={styles.inputLabel}
              min={new Date()}
              max={maxDate}
            />
          </View>
          <View style={styles.inputContainer}>
            <AddMedicineImage setImage={imageChangeHandler} />
          </View>
          <View style={styles.inputContainer}>
            <Input
              label='Additional Remarks'
              value={remarks}
              onChangeText={remarksChangeHandler}
              labelStyle={styles.inputLabel}
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
                icon={isLoading ? () => <ActivityIndicator /> : null}
              >
                {!isLoading && 'SAVE'}
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
    marginVertical: 8
  },
  btnContainer: {
    marginVertical: 12,
    justifyContent: 'flex-end'
  },
  btn: {
    width: '100%',
    marginVertical: 5
  },
  inputLabel: {
    fontSize: 14,
    color: '#070D0D'
  }
});

export default AddMedicine;
