import SearchScreen from '@/components/screen/search-screen';
import { Inter_400Regular, useFonts } from '@expo-google-fonts/inter';
import { SplashScreen } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

const search = () => {
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
        <SearchScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
  },
}); 

export default search
