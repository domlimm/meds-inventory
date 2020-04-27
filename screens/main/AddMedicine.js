import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  KeyboardAvoidingView,
  Alert,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {
  Button,
  Input,
  Select,
  Icon,
  SelectItem,
  IndexPath,
  Datepicker,
  Text,
  Layout,
  TopNavigation,
  Avatar
} from '@ui-kitten/components';
import { useDispatch } from 'react-redux';

import { drugTypes, drugMeasurements } from '../../constants/drugType';
import AddMedicineImage from '../../components/AddMedicineImage';
import LoadingIndicator from '../../components/LoadingIndicator';
import * as medActions from '../../store/actions/medicine';
import { pillImages, syrupImages, creamImages } from '../../constants/drugType';

const { width, height } = Dimensions.get('window');

const AddMedicine = props => {
  const dispatch = useDispatch();

  const [medName, setMedName] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const [amount, setAmount] = useState('');
  const [expiryDate, setExpiryDate] = useState(null);
  const [imagePath, setImagePath] = useState();
  const [remarks, setRemarks] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const drugType = drugTypes[selectedIndex.row];

  useEffect(() => {
    if (error) {
      Alert.alert('Error Occured', error, [{ text: 'Close' }]);
    }
  }, [error]);

  const medNameChangeHandler = value => {
    setMedName(value);
  };

  const imageChangeHandler = imagePath => {
    setImagePath(imagePath);
  };

  const renderSelectItem = title => <SelectItem key={title} title={title} />;

  const amtHandler = amt => {
    setAmount(amt.toString());
  };

  const remarksChangeHandler = remarks => {
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
          selectedIcon,
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
    setSelectedIcon('');
    setIsLoading(false);
  };

  const SaveIcon = props => <Icon {...props} name='save-outline' />;

  const CloseIcon = props => <Icon {...props} name='close-outline' />;

  const CalendarIcon = props => <Icon {...props} name='calendar-outline' />;

  const tDate = new Date();
  const maxDate = new Date(tDate.getFullYear() + 10, tDate.getMonth(), tDate.getDay());

  const InputLabel = props => <Text style={[styles.inputLabel, props.style]}>{props.title}</Text>;

  const renderIconSelector = () => {
    let iconType;

    if (drugType === 'Capsules' || drugType === 'Tablets') {
      iconType = pillImages;
    } else if (drugType === 'Syrup') {
      iconType = syrupImages;
    } else if (drugType === 'Cream') {
      iconType = creamImages;
    }

    return (
      <View style={{ ...styles.inputContainer, ...styles.iconSelector }}>
        <InputLabel style={{ marginBottom: 8 }} title='Display Icon' />
        <FlatList
          data={iconType}
          horizontal={true}
          keyExtractor={icon => icon.id}
          renderItem={renderIconItem}
        />
      </View>
    );
  };

  const renderIconItem = ({ item }) => {
    let idSelected = item.id;
    return (
      <TouchableOpacity
        style={[styles.iconItem, idSelected === selectedIcon && styles.iconItemSelected]}
        onPress={() => selectedIconItem(idSelected)}
      >
        <Avatar size='giant' source={item.path} />
      </TouchableOpacity>
    );
  };

  const selectedIconItem = id => {
    setSelectedIcon(id);
  };

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
                  label={<InputLabel title='Form' />}
                  onSelect={index => setSelectedIndex(index)}
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
            {renderIconSelector()}
            <View style={styles.inputContainer}>
              <InputLabel style={{ marginBottom: 8 }} title='Expiry Date' />
              <Datepicker
                date={expiryDate}
                onSelect={setExpiryDate}
                accessoryRight={CalendarIcon}
                backdropStyle={styles.backdrop}
                min={new Date()}
                max={maxDate}
              />
            </View>
            <View style={styles.inputContainer}>
              <AddMedicineImage loading={isLoading} setImage={imageChangeHandler} />
            </View>
            <View style={styles.inputContainer}>
              <Input
                label={<InputLabel title='Instructions' />}
                value={remarks}
                onChangeText={remarksChangeHandler}
                style={styles.input}
                multiline
                numberOfLines={3}
              />
            </View>
            <View style={styles.btnContainer}>
              <View style={styles.btn}>
                <Button
                  status='success'
                  onPress={addMedicineHandler}
                  accessoryLeft={isLoading ? () => <LoadingIndicator /> : SaveIcon}
                >
                  {isLoading ? 'LOADING' : 'SAVE'}
                </Button>
              </View>
              <View style={styles.btn}>
                <Button status='danger' accessoryLeft={CloseIcon} onPress={closeHandler}>
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
    width: width * 0.9,
    paddingHorizontal: 8
  },
  inputContainer: {
    marginVertical: 10
  },
  iconSelector: {
    height: 96
  },
  iconItem: {
    marginHorizontal: 8
  },
  iconItemSelected: {
    backgroundColor: '#366FC8',
    padding: 4,
    borderRadius: 5
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
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
});

export default AddMedicine;
