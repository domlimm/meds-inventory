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
  TopNavigationAction,
  Avatar,
  Toggle
} from '@ui-kitten/components';
import { useDispatch } from 'react-redux';

import { drugTypes, drugMeasurements } from '../../constants/drugType';
import AddMedicineImage from '../../components/AddMedicineImage';
import LoadingIndicator from '../../components/LoadingIndicator';
import * as medActions from '../../store/actions/medicine';
import { pillImages, syrupImages, creamImages } from '../../constants/drugType';

const { width } = Dimensions.get('window');

const AddMedicine = props => {
  const dispatch = useDispatch();

  const [medName, setMedName] = useState('');
  const [amount, setAmount] = useState('');
  const [whenNeeded, setWhenNeeded] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [packs, setPacks] = useState('');
  const [totalSum, setTotalSum] = useState('');
  const [quantitySum, setQuantitySum] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const [imagePath, setImagePath] = useState();
  const [instructions, setInstructions] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(null);

  const [sdToday, setSdToday] = useState(true);
  const [amountType, setAmountType] = useState('');
  const [disableQtyField, setDisableQtyField] = useState(false);
  const [showEndDate, setShowEndDate] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const drugType = drugTypes[selectedIndex.row];

  useEffect(() => {
    if (error) {
      Alert.alert('Error Occured', error, [{ text: 'Close' }]);
    }
  }, [error]);

  useEffect(() => {
    setQuantitySum(null);
    setQuantity('');
    setPacks('');
    setDisableQtyField(drugType === 'Cream' || drugType === 'Syrup');
    setAmountType(drugMeasurements[drugType]);

    if (drugType === 'Cream' || drugType === 'Syrup') {
      setQuantity('1');
    } else {
      setQuantity('');
    }
  }, [drugType]);

  const medNameChangeHandler = value => {
    setMedName(value);
  };

  const imageChangeHandler = imagePath => {
    setImagePath(imagePath);
  };

  const renderSelectItem = title =>
    title === 'Cream' ? (
      <SelectItem key={title} disabled title={title} />
    ) : (
      <SelectItem key={title} title={title} />
    );

  const amtHandler = amt => {
    setAmount(amt.toString());
  };

  const instructionsChangeHandler = text => {
    setInstructions(text);
  };

  const whenNeededHandler = () => {
    setWhenNeeded(!whenNeeded);
  };

  const showEDHandler = () => {
    setShowEndDate(!showEndDate);
    setEndDate(null);
  };

  const isTodayHandler = () => {
    setSdToday(!sdToday);
    setStartDate(null);
  };

  const quantityChangeHandler = quantity => {
    setQuantity(quantity);
    calculateSum(quantity, packs);
  };

  const packsChangeHandler = packs => {
    setPacks(packs);
    calculateSum(quantity, packs);
  };

  const calculateSum = (quantity, packs) => {
    const qty = !isNaN(parseInt(quantity)) ? parseInt(quantity) : 0;
    const sets = !isNaN(parseInt(packs)) ? parseInt(packs) : 0;
    let noun;

    if (drugType === 'Capsules') {
      noun = 'Capsules';
    } else if (drugType === 'Tablets') {
      noun = 'Tablets';
    } else if (drugType === 'Syrup') {
      if (sets === 1) {
        noun = 'Bottle';
      } else {
        noun = 'Bottles';
      }
    } else if (drugType === 'Cream') {
      if (sets === 1) {
        noun = 'Salve';
      } else {
        noun = 'Salves';
      }
    }

    setQuantitySum(`${(qty * sets).toString()} ${noun}`);
    setTotalSum((qty * sets).toString());
  };

  const addMedicineHandler = async () => {
    const dosage = {
      type: drugType,
      amount: drugType !== 'Cream' ? amount.toString() : 'Use',
      unit: drugType !== 'Cream' ? drugMeasurements[drugType] : 'as needed'
    };

    const sd = startDate
      ? startDate.toLocaleDateString('en-GB')
      : sdToday
      ? new Date().toLocaleDateString('en-GB')
      : '';
    const ed = endDate ? endDate.toLocaleDateString('en-GB') : '';

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
          instructions,
          whenNeeded,
          sd,
          ed,
          null,
          totalSum
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

  const renderCloseAction = () => (
    <TopNavigationAction
      icon={CloseIcon}
      onPress={() => {
        clearInputs();
        props.navigation.goBack();
      }}
    />
  );

  const clearInputs = () => {
    setMedName('');
    setWhenNeeded(false);
    setStartDate(null);
    setEndDate(null);
    setExpiryDate(null);
    setQuantitySum(null);
    setQuantity('');
    setPacks('');
    setImagePath(null);
    setInstructions('');
    setAmount('');
    setDisableQtyField(false);
    setSelectedIcon(null);
    setIsLoading(false);
    setAmountType('');
    setTotalSum('');
  };

  const SaveIcon = props => <Icon {...props} name='save-outline' />;

  const CloseIcon = props => <Icon {...props} name='close-outline' />;

  const CalendarIcon = props => <Icon {...props} name='calendar-outline' />;

  const tDate = new Date();
  const maxDate = new Date(tDate.getFullYear() + 10, tDate.getMonth(), tDate.getDay());
  const minStartDate = new Date(tDate.getFullYear() - 100, tDate.getMonth(), tDate.getDay());
  const maxStartDate = new Date(tDate.getFullYear() + 1, tDate.getMonth(), tDate.getDay());

  const InputLabel = props => <Text style={[styles.inputLabel, props.style]}>{props.title}</Text>;

  const TopNavText = () => <Text style={{ fontWeight: 'bold' }}>ADD MEDICINE</Text>;

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
    <Layout style={{ flex: 1 }}>
      <TopNavigation alignment='center' title={<TopNavText />} accessoryRight={renderCloseAction} />
      <ScrollView>
        <KeyboardAvoidingView style={styles.addMedicineView}>
          <View style={styles.addSV}>
            {/* Medicine Name */}
            <View style={styles.inputContainer}>
              <Input
                label={<InputLabel title='Medicine Name' />}
                value={medName}
                onChangeText={medNameChangeHandler}
                style={styles.input}
                autoFocus={true}
              />
            </View>
            {/* Dosage per single consumption */}
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
                  label={<InputLabel title={`Amount (${amountType})`} />}
                  keyboardType='numeric'
                  value={amount}
                  onChangeText={amtHandler}
                  returnKeyType='next'
                />
              </View>
            </View>
            {/* Medicine Icon */}
            {renderIconSelector()}
            {/* Period of Medication */}
            <View style={{ ...styles.inputContainer, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 0.5 }}>
                <InputLabel style={{ fontSize: 14 }} title='Take when needed' />
              </View>
              <View style={{ flex: 0.5 }}>
                <Toggle
                  checked={whenNeeded}
                  style={{ alignSelf: 'flex-end' }}
                  onChange={whenNeededHandler}
                />
              </View>
            </View>
            <View style={{ ...styles.inputContainer, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 0.5 }}>
                <InputLabel style={{ fontSize: 14 }} title='Starting Today' />
              </View>
              <View style={{ flex: 0.5 }}>
                <Toggle
                  checked={sdToday}
                  style={{ alignSelf: 'flex-end' }}
                  onChange={isTodayHandler}
                />
              </View>
            </View>
            <View style={[styles.inputContainer, { display: !sdToday ? 'flex' : 'none' }]}>
              <Datepicker
                date={startDate}
                onSelect={setStartDate}
                accessoryRight={CalendarIcon}
                backdropStyle={styles.backdrop}
                min={minStartDate}
                max={maxStartDate}
                label={<InputLabel style={{ marginBottom: 8 }} title='Start Date' />}
              />
            </View>
            <View style={{ ...styles.inputContainer, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 0.5 }}>
                <InputLabel style={{ fontSize: 14 }} title='Forever' />
              </View>
              <View style={{ flex: 0.5 }}>
                <Toggle
                  checked={showEndDate}
                  style={{ alignSelf: 'flex-end' }}
                  onChange={showEDHandler}
                />
              </View>
            </View>
            <View style={[styles.inputContainer, { display: !showEndDate ? 'flex' : 'none' }]}>
              <Datepicker
                date={endDate}
                onSelect={setEndDate}
                accessoryRight={CalendarIcon}
                backdropStyle={styles.backdrop}
                min={new Date()}
                max={maxDate}
                label={<InputLabel style={{ marginBottom: 8 }} title='End Date' />}
              />
            </View>
            {/* Total Quantity */}
            <View style={styles.inputContainer}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 0.5, marginRight: 5 }}>
                  <Input
                    label={
                      <InputLabel
                        title={`No. of ${
                          drugType === 'Capsules' || drugType === 'Tablets'
                            ? 'Pack/s'
                            : drugType === 'Cream'
                            ? 'Salve/s'
                            : drugType === 'Syrup'
                            ? 'Bottle/s'
                            : 'Set/s'
                        }`}
                      />
                    }
                    keyboardType='numeric'
                    value={packs}
                    onChangeText={packsChangeHandler}
                  />
                </View>
                <View style={{ flex: 0.5, marginLeft: 5 }}>
                  <Input
                    label={<InputLabel title='Quantity' />}
                    keyboardType='numeric'
                    value={quantity}
                    onChangeText={quantityChangeHandler}
                    disabled={disableQtyField}
                  />
                </View>
              </View>
              {quantitySum && (
                <View
                  style={{ ...styles.inputContainer, flexDirection: 'row', alignItems: 'center' }}
                >
                  <View style={{ flex: 0.5 }}>
                    <InputLabel style={{ fontSize: 14 }} title='Total' />
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <InputLabel
                      style={{ fontSize: 14, fontWeight: 'bold', alignSelf: 'flex-end' }}
                      title={quantitySum}
                    />
                  </View>
                </View>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Datepicker
                date={expiryDate}
                onSelect={setExpiryDate}
                accessoryRight={CalendarIcon}
                backdropStyle={styles.backdrop}
                min={new Date()}
                max={maxDate}
                label={<InputLabel style={{ marginBottom: 8 }} title='Expiry Date' />}
              />
            </View>
            {/* Medicine Image */}
            <View style={styles.inputContainer}>
              <AddMedicineImage loading={isLoading} setImage={imageChangeHandler} />
            </View>
            {/* Instructions */}
            <View style={styles.inputContainer}>
              <Input
                label={<InputLabel title='Instructions' />}
                value={instructions}
                onChangeText={instructionsChangeHandler}
                style={styles.input}
                multiline
                numberOfLines={3}
              />
            </View>
            {/* Actions */}
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
        </KeyboardAvoidingView>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  addMedicineView: {
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
