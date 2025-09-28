import HomePage from '@/components/screen/home-screen';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const index = () => {
  return (
    <SafeAreaView style={styles.container}>
       <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <HomePage />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
})

export default index