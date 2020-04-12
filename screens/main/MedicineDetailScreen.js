import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import { Text, Layout } from '@ui-kitten/components';

const MedicineDetailScreen = (props) => {
  const { medId, medName } = props.route.params;

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Layout style={styles.imageContainer}>
        <Text>Image</Text>
      </Layout>
      <Text>
        Medicine Details: {medId} {medName}
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  imageContainer: {}
});

export default MedicineDetailScreen;
