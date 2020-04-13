import React from 'react';
import { useSelector } from 'react-redux';
import { Image, StyleSheet, Dimensions } from 'react-native';
import { Text, Layout } from '@ui-kitten/components';

const { width, height } = Dimensions.get('window');

const MedicineDetailScreen = (props) => {
  const { medData } = props.route.params;

  return (
    <Layout style={{ flex: 1 }}>
      <Layout style={styles.imageContainer}>
        {medData.imageUrl ? (
          <Image style={styles.image} source={{ uri: medData.imageUrl }} />
        ) : (
          <Image
            style={styles.image}
            source={require('../../assets/images/medicine.jpg')}
          />
        )}
      </Layout>
      <Text>Medicine Details: test</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: width * 0.9,
    height: 225,
    borderRadius: 5
  },
  image: {
    width: '100%',
    height: '100%'
  }
});

export default MedicineDetailScreen;
