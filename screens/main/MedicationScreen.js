import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, SafeAreaView, Dimensions, FlatList, View } from 'react-native';
import {
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Spinner,
  Text,
  Input
} from '@ui-kitten/components';

import MedicineItem from '../../components/MedicineItem';
import * as medicineActions from '../../store/actions/medicine';

const { height, width } = Dimensions.get('window');

const MedicationScreen = props => {
  const dispatch = useDispatch();

  const medication = useSelector(state => state.medicine.medicine);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [search, setSearch] = useState('');

  const medication_handler = useCallback(async () => {
    setIsRefresh(true);
    await dispatch(medicineActions.retrieveMedication());
    setIsRefresh(false);
  }, [dispatch, isLoading]);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = props.navigation.addListener('focus', medication_handler);
    setIsLoading(false);
    return () => {
      unsubscribe();
    };
  }, [props.navigation]);

  const clearSearch = () => {
    setSearch('');
  };

  const addMedicineIcon = props => <Icon {...props} name='plus-circle' />;

  const searchIcon = props => <Icon {...props} name='search-outline' />;

  const clearIcon = props => <Icon {...props} name='close-outline' onPress={clearSearch} />;

  const MenuIcon = props => <Icon {...props} name='menu' />;

  const AddMedAction = () => (
    <TopNavigationAction
      icon={addMedicineIcon}
      onPress={() => props.navigation.navigate('Medication', { screen: 'MedicineAdd' })}
    />
  );

  const renderDrawerAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={() => props.navigation.toggleDrawer()} />
  );

  const TopNavText = () => <Text style={{ fontWeight: 'bold' }}>MEDICATION LIST</Text>;

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <TopNavigation
        alignment='center'
        title={<TopNavText />}
        accessoryLeft={renderDrawerAction}
        accessoryRight={AddMedAction}
      />
      <Layout style={styles.searchContainer}>
        <Input
          value={search}
          accessoryLeft={searchIcon}
          placeholder='Search for Medicine'
          style={styles.searchInput}
          onChangeText={val => setSearch(val)}
          accessoryRight={search.length > 0 && clearIcon}
        />
      </Layout>
      <Layout style={styles.mainContainer}>
        {isLoading ? (
          <Spinner />
        ) : medication.length === 0 ? (
          <View>
            <Text>Start adding your medicine!</Text>
          </View>
        ) : (
          <FlatList
            data={medication}
            refreshing={isRefresh}
            onRefresh={medication_handler}
            keyExtractor={med => med.id}
            renderItem={medData => {
              return (
                <MedicineItem
                  id={medData.item.id}
                  name={medData.item.name}
                  expiry={medData.item.expiry}
                  imageUrl={medData.item.imageUrl}
                  iconId={medData.item.iconId}
                  dosage={medData.item.dosage}
                  instructions={medData.item.instructions}
                  scheduleConfigured={medData.item.scheduleConfigured}
                  refillConfigured={medData.item.refillConfigured}
                  takewhenNeeded={!!medData.item.takewhenNeeded}
                  startDate={medData.item.startDate}
                  endDate={medData.item.endDate}
                  endDate={medData.item.endDate}
                  usedSum={medData.item.usedSum}
                  quantitySum={medData.item.quantitySum}
                />
              );
            }}
          />
        )}
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1
  },
  mainContainer: {
    flex: 1,
    height: height,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 8
  },
  searchInput: {
    width: width * 0.92
  }
});

export default MedicationScreen;
