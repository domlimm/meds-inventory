import React from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity } from 'react-native';
import { Text, Avatar } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

import { pillImages, creamImages, syrupImages } from '../constants/drugType';

const { width, height } = Dimensions.get('window');
const collatedIcons = [...pillImages, ...creamImages, ...syrupImages];

const MedicineItem = props => {
  const { name, dosage, iconId } = props;
  const navigation = useNavigation();
  let iconUrl = collatedIcons.find(icon => icon.id === iconId).path;

  return (
    <TouchableOpacity
      style={styles.medicineContainer}
      onPress={() =>
        navigation.navigate('MedicineDetail', {
          medData: props
        })
      }
      activeOpacity={0.9}
    >
      <Avatar source={iconUrl} size='large' />
      <View style={styles.medicineBody}>
        <Text category='s1'>{name}</Text>
        <Text appearance='hint' category='c1'>
          {dosage.type}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  medicineContainer: {
    backgroundColor: '#F6F7F9',
    marginHorizontal: 10,
    marginVertical: 12,
    width: width * 0.8,
    height: height * 0.1,
    borderRadius: 5,
    elevation: 6,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  medicineBody: {
    marginLeft: 10
  },
  medicineFooter: {},
  image: {
    width: '100%',
    height: (height * 0.4) / 2,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  }
});

export default MedicineItem;
