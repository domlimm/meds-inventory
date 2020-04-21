import React, { useState } from 'react';
import { ScrollView, Image, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import {
  Text,
  Layout,
  TopNavigation,
  Icon,
  MenuItem,
  OverflowMenu,
  TopNavigationAction
} from '@ui-kitten/components';

const { width, height } = Dimensions.get('window');

const MedicineDetailScreen = props => {
  const { medData } = props.route.params;

  const [showMenu, setShowMenu] = useState(false);

  const EditIcon = props => <Icon {...props} name='edit-outline' />;

  const DeleteIcon = props => <Icon {...props} name='trash-2-outline' />;

  const BackIcon = props => <Icon {...props} name='arrow-back-outline' />;

  const MenuIcon = props => <Icon {...props} name='menu-outline' />;

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const renderMenuAction = () => <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />;

  const renderRightActions = () => (
    <OverflowMenu anchor={renderMenuAction} visible={showMenu} onBackdropPress={toggleMenu}>
      <MenuItem accessoryLeft={EditIcon} title='Edit' />
      <MenuItem accessoryLeft={DeleteIcon} title='Delete' />
    </OverflowMenu>
  );

  const renderBackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={() => props.navigation.navigate('Medication', { screen: 'MedicineMain' })}
    />
  );

  return (
    <SafeAreaView>
      <TopNavigation
        title='MEDICINE DETAILS'
        alignment='center'
        accessoryLeft={renderBackAction}
        accessoryRight={renderRightActions}
      />
      <ScrollView contentContainerStyle={styles.body}>
        <Layout style={styles.screen}>
          <Layout style={styles.imageContainer}>
            {medData.imageUrl && <Image style={styles.image} source={{ uri: medData.imageUrl }} />}
          </Layout>
          <Text>Medicine Details: test</Text>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  body: {
    height: height * 0.9
  },
  imageContainer: {
    alignSelf: 'center',
    width: width * 0.9,
    height: 225,
    borderRadius: 5
  },
  image: {
    width: '100%',
    height: '100%'
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
});

export default MedicineDetailScreen;
