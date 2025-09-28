import Header from '@/components/header-section'
import MainSection from '@/components/hero-mainsection'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Header />
      <MainSection />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1
  }
})


export default HomePage