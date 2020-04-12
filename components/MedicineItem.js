import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Button, Layout, Card } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const MedicineItem = (props) => {
  const { id, name, dosage, configured } = props;
  const navigation = useNavigation();

  return (
    <Card
      status={configured ? 'success' : 'danger'}
      style={styles.medicineContainer}
      onPress={() =>
        navigation.navigate('MedicineDetail', { medId: id, medName: name })
      }
    >
      <Text category='h6' style={styles.medName}>
        {name}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  medicineContainer: {
    margin: 14,
    width: width * 0.42,
    height: height * 0.36,
    borderRadius: 12,
    elevation: 10
  },
  medName: {
    marginTop: 2
  },
  imageContainer: {
    width: '100%',
    height: 125,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5
  },
  image: {
    width: '100%',
    height: '100%'
  }
  // cardHeader: {
  //   paddingHorizontal: 10,
  //   paddingVertical: 10
  // },
  // cardFooter: {
  //   marginVertical: -5,
  //   marginHorizontal: -10,
  //   alignItems: 'flex-end'
  // },
});

export default MedicineItem;
