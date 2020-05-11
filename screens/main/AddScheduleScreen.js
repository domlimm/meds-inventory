import React, { useState } from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView, Dimensions, Platform } from 'react-native';
import {
  Layout,
  Modal,
  Icon,
  TopNavigation,
  TopNavigationAction,
  Card,
  Text,
  Radio,
  RadioGroup,
  Divider,
  IndexPath,
  Select,
  SelectItem,
  Button
} from '@ui-kitten/components';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const { height, width } = Dimensions.get('window');

const AddScheduleScreen = props => {
  const [showInfo, setShowInfo] = useState(false);
  const [modeIndex, setModeIndex] = useState(null);

  const [freqIndex, setFreqIndex] = useState(new IndexPath(1));

  const [dailyIndex, setDailyIndex] = useState(new IndexPath(0));

  const [hourIndex, setHourIndex] = useState(new IndexPath(0));
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [hasTime, setHasTime] = useState(false);
  const [time, setTime] = useState(new Date().setHours(0, 0, 0, 0));

  const CloseIcon = props => <Icon {...props} name='close-outline' />;

  const InfoIcon = props => <Icon {...props} name='info-outline' />;

  const ClockIcon = props => <Icon {...props} name='clock-outline' />;

  const SettingIcon = props => (
    <Icon
      {...props}
      style={{ height: 20, width: 20, marginHorizontal: 8, marginTop: 4 }}
      name='settings-outline'
    />
  );

  const toggleInfoModal = () => {
    setShowInfo(!showInfo);
  };

  const renderBackAction = () => (
    <TopNavigationAction icon={CloseIcon} onPress={() => props.navigation.goBack()} />
  );

  const renderInfoAction = () => (
    <TopNavigationAction icon={InfoIcon} onPress={() => toggleInfoModal()} />
  );

  const InfoModal = () => (
    <Modal
      visible={showInfo}
      style={styles.infoModal}
      backdropStyle={styles.backdrop}
      onBackdropPress={toggleInfoModal}
    >
      <Card disabled>
        <Layout style={styles.headModal}>
          <Text category='h6' style={styles.modalHeading}>
            Configuration Mode
          </Text>
          <SettingIcon />
        </Layout>
        <Layout style={styles.childModal}>
          <Text status='success' style={styles.modalSubHeading}>
            Basic
          </Text>
          <Text>Time or Event based reminder.</Text>
        </Layout>
        <Layout style={styles.childModal}>
          <Text status='danger' style={styles.modalSubHeading}>
            Advanced
          </Text>
          <Text>Requires change in intakes with specifications.</Text>
        </Layout>
      </Card>
    </Modal>
  );

  const toggleMode = index => {
    // Clear all inputs
    setModeIndex(index);
  };

  const InputLabel = props => <Text style={[styles.inputLabel, props.style]}>{props.title}</Text>;

  {
    /* <Layout style={styles.inputContainer}></Layout>; */
  }

  const freq = [
    'Daily',
    'Daily, Specific No. of Hour/s',
    'Every Specific No. of Day/s',
    'Alternate Days',
    'Day/s of Week'
  ];
  const intakeDaily = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const intakeHourly = ['0.5', '1', '2', '3', '4', '6', '8', '12'];

  const selected_freq_index = freqIndex.row;
  const freqDisplay = freq[selected_freq_index];

  const renderFreqItems = data => <SelectItem title={data} key={data} />;
  const renderIntakeItems = data => <SelectItem title={data} key={data} />;

  const Daily_Element = () => (
    <Layout style={styles.inputContainer}>
      <Layout style={styles.inputContainer}>
        <Select
          label={<InputLabel title='No. of Intake/s Daily' />}
          onSelect={index => setDailyIndex(index)}
          selectedIndex={dailyIndex}
          value={intakeDaily[dailyIndex.row]}
        >
          {intakeDaily.map(renderIntakeItems)}
        </Select>
      </Layout>
      <Layout style={styles.inputContainer}>
        <Button onPress={() => console.log('Add time elements')}>ADD REMINDER (counter)</Button>
      </Layout>
    </Layout>
  );

  const showTimeHandler = () => {
    setTimePickerVisibility(!isTimePickerVisible);
  };

  let button_hour = new Date(time).getHours();
  button_hour = button_hour % 12;
  button_hour = button_hour ? button_hour : 12;

  let button_minutes = new Date(time).getMinutes();
  button_minutes = button_minutes < 10 ? '0' + button_minutes : button_minutes;

  const button_time = `${button_hour}:${button_minutes} ${
    new Date(time).getHours() > 12 ? 'PM' : 'AM'
  }`;

  const onTimeChangeHandler = selected_time => {
    console.log('selected_time', selected_time);
    setTimePickerVisibility(Platform.OS === 'ios');
    setHasTime(true);
    setTime(selected_time);
  };

  const Hours_Element = () => (
    <Layout style={styles.inputContainer}>
      <Layout style={styles.inputContainer}>
        <Select
          label={<InputLabel title='Specify No. of Hour/s' />}
          onSelect={index => setHourIndex(index)}
          selectedIndex={hourIndex}
          value={intakeHourly[hourIndex.row]}
        >
          {intakeHourly.map(renderIntakeItems)}
        </Select>
      </Layout>
      <Layout style={styles.inputContainer}>
        <Button onPress={showTimeHandler} accessoryRight={ClockIcon}>
          {hasTime ? `TIME SELECTED: ${button_time}` : 'SET START TIME'}
        </Button>
        <DateTimePickerModal
          mode='time'
          isVisible={isTimePickerVisible}
          onConfirm={onTimeChangeHandler}
          onCancel={showTimeHandler}
          isDarkModeEnabled={true}
          date={new Date().setHours(0, 0, 0, 0)}
        />
      </Layout>
    </Layout>
  );

  return (
    <Layout style={styles.screen}>
      <TopNavigation
        title='CONFIGURE SCHEDULE'
        alignment='center'
        accessoryLeft={renderBackAction}
        accessoryRight={renderInfoAction}
      />
      <InfoModal />
      <ScrollView>
        <KeyboardAvoidingView style={styles.addScheduleView}>
          <Layout style={styles.elementsView}>
            <Layout style={styles.inputContainer}>
              <InputLabel title='Mode' style={{ marginBottom: 8 }} />
              <RadioGroup
                style={styles.radioContainer}
                selectedIndex={modeIndex}
                onChange={toggleMode}
              >
                <Radio status='success'>Basic</Radio>
                <Radio status='danger'>Advanced</Radio>
              </RadioGroup>
              <Divider style={{ marginTop: 8 }} />
            </Layout>
            {modeIndex === null ? null : modeIndex === 0 ? (
              <Layout>
                <Layout style={styles.inputContainer}>
                  <Select
                    label={<InputLabel title='Frequency' style={{ marginBottom: 8 }} />}
                    onSelect={index => setFreqIndex(index)}
                    selectedIndex={freqIndex}
                    value={freqDisplay}
                  >
                    {freq.map(renderFreqItems)}
                  </Select>
                </Layout>
                {selected_freq_index === 0 ? (
                  <Daily_Element />
                ) : selected_freq_index === 1 ? (
                  <Hours_Element />
                ) : selected_freq_index === 2 ? null : selected_freq_index ===
                  3 ? null : selected_freq_index === 4 ? null : selected_freq_index ===
                  5 ? null : null}
              </Layout>
            ) : (
              <Layout>
                <Text>advanced</Text>
              </Layout>
            )}
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
  addScheduleView: {
    alignItems: 'center'
  },
  elementsView: {
    width: width * 0.9,
    paddingHorizontal: 8
  },
  inputContainer: {
    marginVertical: 10
  },
  radioContainer: {
    flexDirection: 'row'
  },
  headModal: {
    flexDirection: 'row'
  },
  childModal: {
    marginVertical: 5,
    padding: 10
  },
  infoModal: {
    minHeight: 192,
    maxWidth: width * 0.8
  },
  modalHeading: {
    marginBottom: 8
  },
  modalSubHeading: {
    marginBottom: 5
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
});

export default AddScheduleScreen;
