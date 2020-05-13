import React, { useState, useEffect } from 'react';
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
  const [time, setTime] = useState(null);
  const [lastIntake, setLastIntake] = useState(new IndexPath(0));
  const [triggered, setTriggered] = useState(false);
  const [lastIntakeArr, setLastIntakeArr] = useState([]);

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
  const intakeHourly = ['Select Interval', '0.5', '1', '2', '3', '4', '6', '8', '12'];

  const selected_freq_index = freqIndex.row;
  const freqDisplay = freq[selected_freq_index];

  const renderFreqItems = data => <SelectItem title={data} key={data} />;
  const renderIntakeItems = data => <SelectItem title={data} key={data} />;
  const renderHourSpecificItems = data => {
    if (data.trim() === button_time.trim()) {
      return <SelectItem key={data} disabled={true} title={`${data} - START TIME`} />;
    } else {
      return <SelectItem key={data} title={data} />;
    }
  };
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
    new Date(time).getHours() >= 12 ? 'PM' : 'AM'
  }`;

  const onTimeChangeHandler = selected_time => {
    setTimePickerVisibility(Platform.OS === 'ios');
    setHasTime(true);
    setTime(selected_time);
    setTriggered(true);
  };

  let hourly_index = hourIndex.row;

  const generate_lastintake = () => {
    let tempArr = [];
    let first_intake = new Date(time);
    let first_hour = first_intake.getHours();
    let first_minute = first_intake.getMinutes();
    let first_intake_minutes = first_hour * 60 + first_minute;
    const meridiem = ['AM', 'PM'];
    const interval = intakeHourly[hourIndex.row];
    const final_interval = parseFloat(interval) * 60;
    const day_tot_minutes = 24 * 60;
    const total_daily_cycle = day_tot_minutes + first_intake_minutes;
    setLastIntakeArr([]);

    console.log('--new--');

    for (let i = 0; first_intake_minutes < total_daily_cycle; i++) {
      console.log('[start] first_intake_minutes', first_intake_minutes);
      let hourA = Math.floor(first_intake_minutes / 60);
      let hour = hourA >= 24 ? hourA - 24 : hourA;
      let minute = first_intake_minutes % 60;

      tempArr[i] = `${hour === 0 || hour === 12 ? '12' : (hour % 12).toString().slice(-2)}:${(
        '0' + minute
      ).slice(-2)} ${meridiem[hour < 12 ? 0 : 1]}`;

      first_intake_minutes += final_interval;

      console.log('hour', hour);
      console.log('minute', minute);
      console.log('i', i);
      console.log('tempArr[i]', tempArr[i]);
      console.log('[end] first_intake_minutes', first_intake_minutes);
      console.log('==================================================');
    }

    // slice array later based on last intake, then each of the timing save into db as array.
    // Bug : any timing doesnt go past 12am next day
    setLastIntakeArr(tempArr);
    setLastIntake(new IndexPath(0));
  };

  useEffect(() => {
    if (triggered) {
      generate_lastintake();
    }
  }, [hourly_index, time, triggered]);

  const Hours_Element = () => (
    <Layout>
      <Layout style={styles.inputContainer}>
        <Select
          label={<InputLabel title='Specify No. of Hour/s' />}
          onSelect={index => {
            setHourIndex(index);
          }}
          selectedIndex={hourIndex}
          value={intakeHourly[hourly_index]}
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
          date={new Date(new Date().setHours(0, 0, 0, 0))}
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
                  <Layout style={styles.inputContainer}>
                    <Hours_Element />
                    {time ? (
                      <Layout style={styles.inputContainer}>
                        <Select
                          label={<InputLabel title='Set Last Intake' />}
                          onSelect={index => setLastIntake(index)}
                          selectedIndex={lastIntake}
                          value={lastIntakeArr[lastIntake.row]}
                        >
                          {lastIntakeArr.map(renderHourSpecificItems)}
                        </Select>
                      </Layout>
                    ) : null}
                  </Layout>
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
