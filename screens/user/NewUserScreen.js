import React from 'react';
import { Layout, Text, Modal, Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const NewUserScreen = props => {
  const toggleWelcomeModal = () => {
    setTempNewUser(!tempNewUser);
  };

  const renderWelcomeModal = () => (
    <Layout style={styles.welcomeModalContent}>
      <Text style={{ textAlign: 'center' }}>Welcome!</Text>
      <Text style={{ textAlign: 'center', marginVertical: 30 }}>
        As a new user, please proceed to fill in your
        <Text status='danger'> medical information</Text>.
      </Text>
      <Button onPress={toggleWelcomeModal}>PROCEED</Button>
    </Layout>
  );

  return (
    <Modal backdropStyle={styles.backdrop} visible={viewNewUser}>
      {renderWelcomeModal()}
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  welcomeModalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 25,
    margin: 15,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 5
  }
});

export default NewUserScreen;
