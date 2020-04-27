import React from 'react';
import { View } from 'react-native';
import * as UIKitten from '@ui-kitten/components';

const LoadingIndicator = props => {
  return (
    <View>
      <UIKitten.Spinner style={{ color: '#135457' }} size='small' />
    </View>
  );
};

export default LoadingIndicator;
