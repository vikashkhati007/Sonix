import PlayerScreen from '@/components/screen/player-screen';
import { ThemedText } from '@/components/themed-text';
import { Inter_400Regular, useFonts } from '@expo-google-fonts/inter';
import { SplashScreen, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

const music = () => {
    const { id } = useLocalSearchParams();
   const [loaded, error] = useFonts({
    Inter_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ThemedText>Details of user {id} </ThemedText>
        <PlayerScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
  },
}); 

export default music
