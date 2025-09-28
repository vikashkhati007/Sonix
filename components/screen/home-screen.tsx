import MainSection from '@/components/hero-mainsection'
import Header from '@/components/screen/components/header-section'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import TopPlaylistSection from './components/playlist-section'

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Header />
      <MainSection />
      <TopPlaylistSection/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    gap: 25
  }
})


export default HomePage