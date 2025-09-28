import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MusicSearchScreen from './components/search-section';

const searchScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
        <MusicSearchScreen />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
  },
});

export default searchScreen