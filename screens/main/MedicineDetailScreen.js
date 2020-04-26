import React, { useState } from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  View
} from 'react-native';
import {
  Text,
  Layout,
  TopNavigation,
  Icon,
  TopNavigationAction,
  Avatar,
  OverflowMenu,
  MenuItem
} from '@ui-kitten/components';

const { width, height } = Dimensions.get('window');
const DEVICE_HEIGHT = Dimensions.get('screen').height;
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const MedicineDetailScreen = props => {
  const { medData, iconUrl } = props.route.params;
  const [showMenu, setShowMenu] = useState(false);

  const EditIcon = props => <Icon {...props} name='edit-outline' />;

  const DeleteIcon = props => <Icon {...props} name='trash-2-outline' />;

  const BackIcon = props => <Icon {...props} name='arrow-back-outline' />;

  const MenuIcon = props => <Icon {...props} name='more-vertical-outline' />;

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
    <SafeAreaView>
      <TopNavigation
        title='MEDICINE DETAILS'
        alignment='center'
        accessoryLeft={renderBackAction}
        accessoryRight={renderRightActions}
      />
      <Layout style={styles.body}>
        <Layout style={styles.imageContainer}>
          {medData.imageUrl ? (
            <Image style={styles.image} source={{ uri: medData.imageUrl }} />
          ) : (
            <Text>No image taken!</Text>
          )}
        </Layout>
        <Layout style={styles.contentContainer}>
          <Avatar source={iconUrl} size='giant' style={styles.avatar} />
          <ScrollView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
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
            </View>
            <DetailContainer
              extraTitleStyle={styles.remarksContainer}
              title='Instructions'
              value={medData.remarks}
            />
            <Text>test</Text>
            <Text>test</Text>
            <Text>test</Text>
            <Text>test</Text>
            <Text>test</Text>
            <Text>test</Text>
            <Text>test</Text>
            <Text>test</Text>
            <Text>test</Text>
            <Text>test</Text>
            <Text>test</Text>
            <Text>test</Text>
            <Text>test</Text>
            <Text>test</Text>
            <Text>test last</Text>
          </ScrollView>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    height: DEVICE_HEIGHT - 56 - STATUSBAR_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    flex: 0.35,
    width: width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '90%',
    height: '90%',
    borderRadius: 3
  },
  contentContainer: {
    width: '90%',
    backgroundColor: '#CFFFE5',
    flex: 0.65,
    borderRadius: 25,
    // borderTopLeftRadius: 25,
    // borderTopRightRadius: 25,
    paddingHorizontal: 20,
    elevation: 10,
    marginBottom: 50
  },
  avatar: {
    alignSelf: 'center',
    top: -25
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
