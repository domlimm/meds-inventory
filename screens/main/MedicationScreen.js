import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  FlatList,
  View
} from 'react-native';
import {
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Spinner,
  Text
} from '@ui-kitten/components';

import MedicineItem from '../../components/MedicineItem';
import * as medicineActions from '../../store/actions/medicine';

const MedicationScreen = (props) => {
  const dispatch = useDispatch();

  const medication = useSelector((state) => state.medicine.medicine);

  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  const medication_handler = useCallback(async () => {
    setIsRefresh(true);
    await dispatch(medicineActions.retrieveMedication());
    setIsRefresh(false);
  }, [dispatch, isLoading]);

  useEffect(() => {
    console.log('Entered useEffect');
    setIsLoading(true);
    const unsubscribe = props.navigation.addListener(
      'focus',
      medication_handler
    );
    setIsLoading(false);
    return () => {
      unsubscribe();
    };
  }, [props.navigation]);

  const addMedicineIcon = (props) => (
    <Icon {...props} name='file-add-outline' />
  );

  const AddMedAction = () => (
    <TopNavigationAction
      icon={addMedicineIcon}
      onPress={() =>
        props.navigation.navigate('AddMedicine', { screen: 'Add' })
      }
    />
  );

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <TopNavigation
        alignment='center'
        title='MEDICATION LIST'
        accessoryRight={AddMedAction}
      />
      <Layout style={styles.mainContainer}>
        {isLoading ? (
          <Spinner />
        ) : medication.length > 0 ? (
          <FlatList
            data={medication}
            refreshing={isRefresh}
            onRefresh={medication_handler}
            keyExtractor={(med) => med.id}
            numColumns={2}
            renderItem={(medData) => {
              return (
                <MedicineItem
                  id={medData.item.id}
                  name={medData.item.name}
                  expiry={medData.item.expiry}
                  imageUrl={medData.item.imageUrl}
                  dosage={medData.item.dosage}
                  remarks={medData.item.additionalRemarks}
                  configured={medData.item.configured}
                />
              );
            }}
          />
        ) : (
          <View>
            <Text>Start adding your medicine!</Text>
          </View>
        )}
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1
    // backgroundColor: 'white',
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  mainContainer: {
    flex: 1,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MedicationScreen;
