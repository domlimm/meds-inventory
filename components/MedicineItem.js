import React from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity } from 'react-native';
import { Text, Avatar } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

import { pillImages, creamImages, syrupImages } from '../constants/drugType';

const { width, height } = Dimensions.get('window');
const collatedIcons = [...pillImages, ...creamImages, ...syrupImages];

const MedicineItem = props => {
  const { medData } = props;
  const navigation = useNavigation();

  let iconUrl = collatedIcons.find(icon => icon.id === medData.iconId).path;
  let name = medData.name;
  let dType = medData.dosage.type;
  let dAmt = medData.dosage.amount;
  let dUnit = medData.dosage.unit;

  return (
    <TouchableOpacity
      style={styles.medicineContainer}
      onPress={() =>
        navigation.navigate('MedicineDetail', {
          medData: medData,
          iconUrl: iconUrl
        })
      }
      activeOpacity={0.9}
    >
      <Avatar source={iconUrl} size='large' />
      <View style={styles.medicineBody}>
        <Text category='h6' style={{ fontWeight: 'bold' }}>
          {name}
        </Text>
        <Text category='s2'>
          {dType}, {dAmt} {dUnit}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  medicineContainer: {
    backgroundColor: '#4BB09E',
    marginVertical: 10,
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
