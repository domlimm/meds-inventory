import React, { useState, Fragment } from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  View,
  StatusBar
} from 'react-native';
import {
  Text,
  Layout,
  TopNavigation,
  Icon,
  TopNavigationAction,
  OverflowMenu,
  MenuItem,
  Avatar,
  Divider,
  Button
} from '@ui-kitten/components';
import { withBadge } from 'react-native-elements';
import * as Progress from 'react-native-progress';
import { useIsFocused } from '@react-navigation/native';

const { width } = Dimensions.get('window');
// const DEVICE_HEIGHT = Dimensions.get('screen').height;
// const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const MedicineDetailScreen = props => {
  const isFocused = useIsFocused();
  const { medData, iconUrl } = props.route.params;
  const [showMenu, setShowMenu] = useState(false);

  console.log('medData', medData);

  const EditIcon = props => <Icon {...props} name='edit-outline' />;

  const DeleteIcon = props => <Icon {...props} name='trash-2-outline' />;

  const BackIcon = props => <Icon {...props} name='arrow-back-outline' />;

  const MenuIcon = props => <Icon {...props} name='more-vertical-outline' />;

  const NotificationIcon = props => <Icon {...props} name='bell-outline' />;

  const CalendarIcon = props => <Icon {...props} name='calendar-outline' />;

  const RefillIcon = props => <Icon {...props} name='shopping-cart-outline' />;

  const TrueIcon = props => (
    <Icon
      {...props}
      style={[props.style, { marginHorizontal: 10, width: 24, height: 24 }]}
      name='checkmark-outline'
      fill='#166242'
    />
  );

  const FalseIcon = props => (
    <Icon
      {...props}
      style={[props.style, { marginHorizontal: 10, width: 24, height: 24 }]}
      name='close-outline'
      fill='#83112D'
    />
  );

  const BadgedNotiIcon = withBadge(10, {
    top: -4,
    right: -4,
    status: 'success'
  })(NotificationIcon);

  const RightIcon = props => (
    <Icon
      {...props}
      style={[props.style, { width: 12, height: 12, marginTop: 6, marginHorizontal: 5 }]}
      name='chevron-right'
    />
  );

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const renderMenuAction = () => <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />;

  const renderRightActions = () => (
    <Fragment>
      <TopNavigationAction
        icon={BadgedNotiIcon}
        onPress={() => console.log('Show notifications')}
      />
      <OverflowMenu anchor={renderMenuAction} visible={showMenu} onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={EditIcon} title='EDIT' />
        <MenuItem accessoryLeft={DeleteIcon} title='DELETE' />
      </OverflowMenu>
    </Fragment>
  );

  const renderBackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={() => props.navigation.navigate('Medication', { screen: 'MedicineMain' })}
    />
  );

  const MedicineHeader = () => (
    <View style={styles.contentHeader}>
      <View>
        <Text category='h5'>{medData.name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text category='s1' appearance='hint'>
            {medData.dosage.type}
          </Text>
          <RightIcon />
          <Text category='s1' appearance='hint'>
            {`${medData.dosage.amount}${medData.dosage.unit}`}
          </Text>
        </View>
      </View>
      <View style={styles.medicineIcon}>
        <Avatar source={iconUrl} size='giant' />
      </View>
    </View>
  );

  const MedicineSection = () => {
    let inventoryText = 'Inventory - ';
    let remainingSum = (medData.quantitySum - medData.usedSum).toString();
    let dType = medData.dosage.type;
    let percentage = Math.floor((parseInt(remainingSum) / parseInt(medData.quantitySum)) * 100);
    let colorProgress = '#83DB93';

    if (percentage <= 40 && percentage > 15) {
      colorProgress = '#DBAE10';
    } else if (percentage > 0 && percentage <= 15) {
      colorProgress = '#E98478';
    }

    if (dType === 'Capsules' || dType === 'Tablets') {
      if (remainingSum === '1') {
        if (dType === 'Capsules') {
          inventoryText += `${remainingSum}/${medData.quantitySum} Capsule left`;
        } else if (dType === 'Tablets') {
          inventoryText += `${remainingSum}/${medData.quantitySum} Tablet left`;
        }
      } else {
        inventoryText += `${remainingSum}/${medData.quantitySum} ${dType} left`;
      }
    } else if (dType === 'Syrup') {
      if (remainingSum === '1') {
        inventoryText += `${remainingSum}/${medData.quantitySum} Bottle left`;
      } else {
        inventoryText += `${remainingSum}/${medData.quantitySum} Bottles left`;
      }
    } else if (dType === 'Cream') {
      if (remainingSum === '1') {
        inventoryText += `${remainingSum}/${medData.quantitySum} Salve left`;
      } else {
        inventoryText += `${remainingSum}/${medData.quantitySum} Salves left`;
      }
    }

    return (
      <View>
        <View style={styles.contentQuantity}>
          <Text category='s2' style={[styles.title, { fontWeight: 'bold' }]}>
            {inventoryText}
          </Text>
          <Progress.Bar color={colorProgress} width={width * 0.8} progress={percentage / 100} />
        </View>
        <View style={styles.contentPeriod}>
          <View style={styles.periodTFView}>
            <View style={[styles.periodTF, { flex: 0.6 }]}>
              <Text>When Needed</Text>
              {medData.takeWhenNeeded === 'true' ? <TrueIcon /> : <FalseIcon />}
            </View>
            <View style={[styles.periodTF, { flex: 0.4 }]}>
              <Text>Forever</Text>
              {medData.endDate === '' ? <TrueIcon /> : <FalseIcon />}
            </View>
          </View>
          <View style={styles.periodSEView}>
            <View style={[styles.periodSE, { flex: 0.6 }]}>
              <DetailContainer title='Start Date' value={medData.startDate} />
            </View>
            <View style={[styles.periodSE, { flex: 0.4 }]}>
              <DetailContainer
                title='End Date'
                value={medData.endDate !== '' ? medData.endDate : '-'}
              />
            </View>
          </View>
        </View>
        <DetailContainer
          extraTitleStyle={styles.instructionsContainer}
          title='Instructions'
          value={medData.instructions}
        />
        <DividerContainer />
      </View>
    );
  };

  const ScheduleSection = () => {
    return (
      <View style={styles.scheduleSection}>
        {medData.scheduleConfigured === false ? (
          <Text category='s1' style={styles.configuredTitle}>
            No schedule configured!
          </Text>
        ) : null}
        <View style={styles.buttonView}>
          <Button
            accessoryRight={CalendarIcon}
            onPress={() =>
              props.navigation.navigate('Medication', { screen: 'MedicineAddSchedule' })
            }
          >
            {medData.scheduleConfigured === false ? 'CONFIGURE SCHEDULE' : 'EDIT SCHEDULE'}
          </Button>
        </View>
        <DividerContainer />
      </View>
    );
  };

  const RefillSection = () => {
    return (
      <View style={styles.refillSection}>
        {medData.refillConfigured === false ? (
          <Text category='s1' style={styles.configuredTitle}>
            No refill reminder set!
          </Text>
        ) : null}
        <View style={styles.buttonView}>
          <Button
            accessoryRight={RefillIcon}
            onPress={() => props.navigation.navigate('Medication', { screen: 'MedicineAddRefill' })}
          >
            {medData.scheduleConfigured === false ? 'CONFIGURE REFILL' : 'EDIT REFILL'}
          </Button>
        </View>
        <DividerContainer />
      </View>
    );
  };

  const DetailContainer = props => (
    <View style={styles.detailContainer}>
      <Text appearance='hint' category='label' style={styles.title}>
        {props.title}
      </Text>
      <Text style={{ ...styles.value, ...props.extraTitleStyle }}>{props.value}</Text>
    </View>
  );

  const DividerContainer = () => (
    <View style={styles.divide}>
      <Divider />
    </View>
  );

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      {/* {isFocused && <StatusBar barStyle='dark-content' backgroundColor='#4BB09E' />} */}
      <TopNavigation
        style={{ backgroundColor: '#4BB09E' }}
        accessoryLeft={renderBackAction}
        accessoryRight={renderRightActions}
      />
      <Layout style={styles.imageContainer}>
        {medData.imageUrl ? (
          <Image style={styles.image} source={{ uri: medData.imageUrl }} />
        ) : (
          <Text>No image taken!</Text>
        )}
      </Layout>
      <Layout level='2' style={styles.contentContainer}>
        <ScrollView style={{ flex: 1 }}>
          <MedicineHeader />
          <MedicineSection />
          <ScheduleSection />
          <RefillSection />
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: '#4BB09E'
  },
  imageContainer: {
    flex: 0.36,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4BB09E',
    marginTop: -10
  },
  image: {
    width: '100%',
    height: '90%',
    borderRadius: 5
  },
  contentContainer: {
    flex: 0.64,
    elevation: 5,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 5,
    zIndex: 2
  },
  notiIcon: {
    backgroundColor: '#FFFFFF'
  },
  contentHeader: {
    flexDirection: 'row',
    marginBottom: 25
  },
  medicineIcon: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  medicineSection: {},
  scheduleSection: {},
  refillSection: {},
  contentQuantity: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentPeriod: {
    marginVertical: 20
  },
  periodTFView: {
    flexDirection: 'row',
    marginVertical: 10
  },
  periodSEView: {
    flexDirection: 'row',
    marginTop: 10
  },
  periodTF: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  periodSE: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  periodText: {
    fontWeight: 'bold'
  },
  detailContainer: {
    marginBottom: 5
  },
  title: {
    marginBottom: 5
  },
  instructionsContainer: {
    fontSize: 15
  },
  configuredTitle: {
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  buttonView: {
    marginTop: 10
  },
  divide: {
    marginVertical: 12
  }
});

export default MedicineDetailScreen;
