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
  Divider
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

  const DetailContainer = props => (
    <View style={styles.detailContainer}>
      <Text appearance='hint' category='label' style={styles.title}>
        {props.title}
      </Text>
      <Text category='h6' style={{ ...styles.value, ...props.extraTitleStyle }}>
        {props.value}
      </Text>
    </View>
  );

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
      inventoryText += `${remainingSum}/${medData.quantitySum} ${dType.subString(
        0,
        dType.length - 1
      )} left`;
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
    <SafeAreaView style={styles.AndroidSafeArea}>
      {isFocused && <StatusBar barStyle='dark-content' backgroundColor='#74ADA2' />}
      <TopNavigation
        style={{ backgroundColor: '#74ADA2' }}
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
      <Layout level='3' style={styles.contentContainer}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.contentHeader}>
            <View>
              <Text category='h4'>{medData.name}</Text>
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
          <Divider />
          <View style={styles.contentQuantity}>
            <Text category='s2' style={[styles.title, { fontWeight: 'bold' }]}>
              {inventoryText}
            </Text>
            <Progress.Bar color={colorProgress} width={width * 0.8} progress={percentage / 100} />
          </View>
          <View style={styles.contentPeriod}>
            <View style={styles.periodTF}>
              <Text category=''>When Needed</Text>
              {medData.takeWhenNeeded === 'true' ? <TrueIcon /> : <FalseIcon />}
            </View>
            <View style={styles.periodTF}>
              <Text>Forever</Text>
              {medData.endDate === '' ? <TrueIcon /> : <FalseIcon />}
            </View>
          </View>
          {/* <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 0.5 }}>
              <DetailContainer title='Name' value={medData.name} />
              <DetailContainer
                title='Dosage'
                value={`${medData.dosage.amount}${medData.dosage.unit}`}
              />
            </View>
            <View style={{ flex: 0.5 }}>
              <DetailContainer title='Expiry' value={medData.expiry} />
              <DetailContainer title='Form' value={medData.dosage.type} />
            </View>
          </View> */}
          {/* <DetailContainer
            extraTitleStyle={styles.remarksContainer}
            title='Instructions'
            value={medData.remarks}
          /> */}
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: '#74ADA2'
  },
  imageContainer: {
    flex: 0.36,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#74ADA2'
  },
  image: {
    width: '90%',
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
  contentQuantity: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentPeriod: {
    flexDirection: 'row',
    marginVertical: 20
  },
  periodTF: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  periodText: {
    fontWeight: 'bold'
  },
  detailContainer: {
    marginBottom: 20
  },
  title: {
    marginBottom: 5
  },
  value: {
    fontSize: 18
  },
  remarksContainer: {
    fontSize: 15
  }
});

export default MedicineDetailScreen;
