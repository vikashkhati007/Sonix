import SearchScreen from '@/components/screen/search-screen';
import { ThemedText } from '@/components/themed-text';
import { Inter_400Regular, useFonts } from '@expo-google-fonts/inter';
import { SplashScreen, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

const search = () => {
   const [loaded, error] = useFonts({
    Inter_400Regular,
  });
   const { id } = useLocalSearchParams();

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
       <ThemedText style={styles.title}>Details of user {id} </ThemedText>
        <SearchScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
}); 

export default search
