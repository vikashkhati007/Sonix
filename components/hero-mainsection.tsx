import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ThemedText } from './themed-text'

const MainSection = () => {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.text}>Hi, Samantha</ThemedText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  text: {
    color: 'white', fontSize: 24, fontWeight: 500, paddingVertical: 20
  }
})

export default MainSection