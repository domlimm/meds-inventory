import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Image,
  View,
  TouchableOpacity
} from 'react-native';
import { Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const MedicineItem = (props) => {
  const { name, imageUrl, dosage } = props;
  const navigation = useNavigation();

  const Header = () => (
    <View>
      {imageUrl ? (
        <Image style={styles.image} source={{ uri: imageUrl }} />
      ) : (
        <Image
          style={styles.image}
          source={require('../assets/images/medicine.jpg')}
        />
      )}
    </View>
  );

  return (
    <TouchableOpacity
      style={styles.medicineContainer}
      onPress={() =>
        navigation.navigate('MedicineDetail', {
          medData: props
        })
      }
      activeOpacity={0.8}
    >
      <Header />
      <View style={styles.medicineBody}>
        <Text category='h6'>{name}</Text>
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
    marginHorizontal: 18,
    marginVertical: 16,
    width: width * 0.38,
    height: height * 0.32,
    borderRadius: 5,
    elevation: 7
  },
  medicineBody: {
    paddingHorizontal: 10,
    paddingVertical: 7
  },
  image: {
    width: '100%',
    height: (height * 0.32) / 2,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  }
});

export default MedicineItem;
