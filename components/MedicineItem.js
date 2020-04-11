import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Text, Button, Tooltip, Layout, Card } from '@ui-kitten/components';

const MedicineItem = (props) => {
  const { name, expiry, imageUrl, dosage, remarks, configured } = props;

  const [dosageTip, setDosageTip] = useState(false);

  const toggleDosageTip = () => {
    setDosageTip(!dosageTip);
  };

  const Header = () => (
    <Layout style={styles.cardHeader}>
      <Text category='label' style={styles.medName}>
        {name}
      </Text>
    </Layout>
  );

  const Footer = () => (
    <Layout style={styles.cardFooter}>
      {/* <Tooltip
        visible={dosageTip}
        placement={'left'}
        text='EXPIRY DATE'
        onBackdropPress={toggleDosageTip}
        backdropStyle={styles.backdrop}
      >
        <Button
          appearance='outline'
          status='info'
          onPress={toggleDosageTip}
          size='small'
        >
          {expiry}
        </Button>
      </Tooltip> */}
    </Layout>
  );

  // Beware that when using a file path as Image source on Android,
  // you must prepend "file://"" before the file path
  // imageView = (
  //   <Image
  //     source={{
  //       uri:
  //         Platform.OS === 'android'
  //           ? 'file://' + res.path()
  //           : '' + res.path()
  //     }}
  //   />
  // );

  return (
    <Card
      header={Header}
      footer={Footer}
      status={configured ? 'success' : 'danger'}
      style={styles.medicineContainer}
    >
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <Text>No image found!</Text>
        )}
      </View>
      <Text>Dosage, Next scheduled, Image</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  medicineContainer: {
    marginVertical: 10,
    width: Dimensions.get('window').width * 0.8
  },
  medName: {
    fontSize: 16,
    marginTop: 2
  },
  imageContainer: {
    width: '100%',
    height: 125,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 3
  },
  image: {
    width: '100%',
    height: '100%'
  },
  cardHeader: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  cardFooter: {
    marginVertical: -5,
    marginHorizontal: -10,
    alignItems: 'flex-end'
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
});

export default MedicineItem;
