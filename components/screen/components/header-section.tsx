import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { ThemedView } from '../../themed-view';

const Header = () => {
  return (
    <ThemedView style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 }}>
        <Avatar rounded source={{ uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' }} size="medium" />
        <View style={styles.otherContainer}>
          <Icon name="search" color="#fff" size={30} style={styles.icon} />
          <Icon name="heart" type="feather" color="#fff" size={30} style={styles.icon} />
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'black'
  },
  otherContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20, // optional if you want it circular
  },
  icon: {
    backgroundColor: '#1C1C29',
    padding: 10,
    borderRadius: "50%"
  }
});

export default Header;
