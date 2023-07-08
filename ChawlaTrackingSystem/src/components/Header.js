import React from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Button style={styles.button} title='Login' />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  logo: {
    height: 20,
  },
  header: {
    marginTop: 5,
  },
});
