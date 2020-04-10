import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, SafeAreaView, Dimensions, FlatList } from 'react-native';
import {
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components';

import MedicineItem from '../../components/MedicineItem';
import * as medicineActions from '../../store/actions/medicine';
import AddMedicine from '../../components/AddMedicine';

const MedicineScreen = (props) => {
  const dispatch = useDispatch();

  const medication = useSelector((state) => state.medicine.medicine);

  const [addMode, setAddMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  // Snackbar

  const medication_handler = useCallback(async () => {
    try {
      setIsLoading(false);
      await dispatch(medicineActions.retrieveMedication());
    } catch (err) {
      setIsLoading(false);
    }
  }, [dispatch, isLoading]);

  useEffect(() => {
    console.log('Refreshing Data');
    setIsLoading(true);
    const unsubscribe = medication_handler;
    return () => {
      unsubscribe();
    };
  }, [medication_handler]);

  const toggleAddMedicineMode = () => {
    setAddMode(!addMode);
  };

  const addMedicineIcon = (props) => (
    <Icon {...props} name='file-add-outline' />
  );

  const AddMedAction = () => (
    <TopNavigationAction
      icon={addMedicineIcon}
      onPress={toggleAddMedicineMode}
    />
  );

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <TopNavigation
        alignment='center'
        title={addMode ? 'ADD MEDICINE' : 'MEDICATION LIST'}
        accessoryRight={AddMedAction}
      />
      <Layout style={styles.mainContainer}>
        {addMode ? (
          <AddMedicine show={toggleAddMedicineMode} />
        ) : (
          medication.length > 0 &&
          !addMode && (
            <FlatList
              data={medication}
              refreshing={isRefresh}
              onRefresh={medication_handler}
              keyExtractor={(med) => med.id}
              renderItem={(medData) => {
                return (
                  <MedicineItem
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
            // ) : (
            //   <View>
            //     <Text>Start adding your medicine!</Text>
            //   </View>
          )
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
  },
  medicineListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MedicineScreen;
