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
          medData: props,
          iconUrl: iconUrl
        })
      }
      activeOpacity={0.9}
    >
      <Avatar source={iconUrl} size='large' />
      <View style={styles.medicineBody}>
        <Text category='h6'>{name}</Text>
        <Text category='s2'>
          {dosage.type}, {dosage.amount} {dosage.unit}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  medicineContainer: {
    backgroundColor: '#CFFFE5',
    marginHorizontal: 10,
    marginVertical: 12,
    width: width * 0.9,
    height: height * 0.11,
    borderRadius: 5,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  medicineBody: {
    marginLeft: 10
  },
  image: {
    width: '100%',
    height: (height * 0.4) / 2,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  }
});

export default MedicineItem;
