import React from 'react';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';

const MedicineDetailScreen = (props) => {
  const { medId, medName } = props.route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>
        Medicine Details: {medId} {medName}
      </Text>
    </View>
  );
};

export default MedicineDetailScreen;
