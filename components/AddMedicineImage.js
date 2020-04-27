import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Alert } from 'react-native';
import { Icon, Button, Text } from '@ui-kitten/components';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const AddMedicineImage = props => {
  const [medImg, setMedImg] = useState(null);

  useEffect(() => {
    if (!props.loading) {
      setMedImg(null);
    }
  }, [props.loading]);

  const verifyPermissions = () => {
    Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
      .then(result => {
        if (result.status !== 'granted') {
          Alert.alert(
            'Insufficient permissions!',
            'You need to grant camera permissions to continue.',
            [{ text: 'Okay' }]
          );
          return false;
        }
      })
      .catch(err => console.log(err));
    return true;
  };

  const takeImageHandler = async () => {
    const result = verifyPermissions();
    if (!result) {
      return;
    }
    ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5 // 1 highest
    }).then(image => {
      setMedImg(image.uri);
      props.setImage(image.uri);
    });
  };

  const selectImageHandler = async () => {
    const result = verifyPermissions();
    if (!result) {
      return;
    }
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5 // 1 highest
    }).then(image => {
      setMedImg(image.uri);
      props.setImage(image.uri);
    });
  };

  const GalleryIcon = props => <Icon {...props} name='image-outline' />;

  const CameraIcon = props => <Icon {...props} name='camera-outline' />;

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {medImg ? (
          <Image style={styles.image} source={{ uri: medImg }} />
        ) : (
          <Text>No image picked/taken yet.</Text>
        )}
      </View>
      <View style={styles.btnContainer}>
        <View style={styles.btnHolder}>
          <Button onPress={takeImageHandler} accessoryLeft={CameraIcon}>
            CAMERA
          </Button>
        </View>
        <View style={styles.btnHolder}>
          <Button onPress={selectImageHandler} accessoryLeft={GalleryIcon}>
            GALLERY
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center'
  },
  imagePreview: {
    width: '100%',
    height: 200,
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
  btnContainer: {
    width: '100%',
    flexDirection: 'row'
  },
  btnHolder: {
    flex: 0.5,
    marginHorizontal: 5
  }
});

export default AddMedicineImage;
