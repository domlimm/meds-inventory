import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
  Card,
  CardHeader,
  Layout,
  Text,
  Button,
  Tooltip,
} from '@ui-kitten/components';

const Medicine = (props) => {
  const { name, expiry, image, dosage, remarks, configured } = props;
  console.log('props', props);

  const [dosageTip, setDosageTip] = useState(false);

  const toggleDosageTip = () => {
    setDosageTip(!dosageTip);
  };

  const Header = () => (
    <CardHeader>
      <Text category='label' style={styles.medName}>
        {name}
      </Text>
    </CardHeader>
  );

  const Footer = () => (
    <View style={styles.cardFooter}>
      <Tooltip
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
      </Tooltip>
    </View>
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
      <Layout style={styles.imageContainer}>
        {!image.length === 0 ? (
          <Image
            source={{
              uri: image,
            }}
          />
        ) : (
          <Text>No image found!</Text>
        )}
      </Layout>
      <Text>Dosage, Next scheduled, Image</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  medicineContainer: {
    marginVertical: 10,
    width: '85%',
  },
  medName: {
    fontSize: 16,
    marginTop: 2,
  },
  imageContainer: {
    width: '100%',
    height: 125,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 3,
  },
  cardFooter: {
    marginVertical: -5,
    marginHorizontal: -10,
    alignItems: 'flex-end',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Medicine;
