import React, { useState } from 'react';
import { ScrollView, Image, StyleSheet, Dimensions, SafeAreaView, View } from 'react-native';
import {
  Text,
  Layout,
  TopNavigation,
  Icon,
  TopNavigationAction,
  OverflowMenu,
  MenuItem,
  Avatar
} from '@ui-kitten/components';
import * as Progress from 'react-native-progress';

const { width } = Dimensions.get('window');
// const DEVICE_HEIGHT = Dimensions.get('screen').height;
// const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const MedicineDetailScreen = props => {
  const { medData, iconUrl } = props.route.params;
  const [showMenu, setShowMenu] = useState(false);

  const EditIcon = props => <Icon {...props} name='edit-outline' />;

  const DeleteIcon = props => <Icon {...props} name='trash-2-outline' />;

  const BackIcon = props => <Icon {...props} name='arrow-back-outline' />;

  const MenuIcon = props => <Icon {...props} name='more-vertical-outline' />;

  const RightIcon = props => (
    <Icon
      {...props}
      style={{ width: 12, height: 12, marginTop: 6, marginHorizontal: 5 }}
      name='chevron-right'
    />
  );

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const renderMenuAction = () => <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />;

  const renderRightActions = () => (
    <OverflowMenu anchor={renderMenuAction} visible={showMenu} onBackdropPress={toggleMenu}>
      <MenuItem accessoryLeft={EditIcon} title='EDIT' />
      <MenuItem accessoryLeft={DeleteIcon} title='DELETE' />
    </OverflowMenu>
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

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
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
              <Avatar source={iconUrl} size='giant' style={{ marginTop: 2 }} />
            </View>
          </View>
          <View style={styles.contentQuantity}>
            <Text category='s2' style={styles.title}>
              Inventory (37/50) amend later
            </Text>
            <Progress.Bar
              color='#2E89F7'
              width={width * 0.8}
              progress={0.74}
              style={{ marginVertical: 8 }}
            />
          </View>
          <View></View>
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
    width: '100%',
    flex: 0.64,
    elevation: 5,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 5,
    zIndex: 2
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
