import { ThemedText } from '@/components/themed-text'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const PlaylistPage = () => {
  return (
    <SafeAreaView style={{ flex: 1 , display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ThemedText>PlaylistPage</ThemedText>
    </SafeAreaView>
  )
}

export default PlaylistPage