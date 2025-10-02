import PlayerScreen from '@/components/screen/player-screen';
import { Inter_400Regular, useFonts } from '@expo-google-fonts/inter';
import { SplashScreen, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

const music = () => {
    const { id, thumbnails, name, artistName, albumName, playlistId } = useLocalSearchParams();
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
        <PlayerScreen 
            id={String(id)}
            thumbnails={String(thumbnails)}
            name={String(name)}
            artistName={String(artistName)}
            albumName={String(albumName)}
            playlistId={String(playlistId)}
        />
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