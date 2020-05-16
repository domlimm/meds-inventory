import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Layout, Icon, Button } from '@ui-kitten/components';

const { width } = Dimensions.get('window');

const DailyReminderItem = props => {
  const DeleteIcon = props => (
    <Icon
      {...props}
      name='trash-2'
      height='21'
      width='21'
      fill='#4BB09E'
      style={{ alignSelf: 'center' }}
    />
  );
  const ClockIcon = props => (
    <Icon {...props} name='clock-outline' height='21' width='21' style={{ alignSelf: 'center' }} />
  );

  return (
    <Layout style={styles.reminderContainer}>
      <Layout style={styles.middleSection}>
        <Button accessoryLeft={ClockIcon}>{props.itemData.time}</Button>
      </Layout>
      <Layout style={styles.rightSection}>
        <Button
          onPress={props.deleteTime}
          accessoryLeft={DeleteIcon}
          style={{ width: '80%' }}
          appearance='ghost'
        />
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  reminderContainer: {
    flex: 1,
    width: width * 0.9,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  middleSection: {
    flex: 0.8
  },
  rightSection: {
    flex: 0.2
  }
});

export default DailyReminderItem;
