import { Inter_400Regular, useFonts } from "@expo-google-fonts/inter";
import { SplashScreen } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import CategoryTabs from "./screen/components/category";
import { ThemedText } from "./themed-text";

const MainSection = () => {
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
      <ThemedText style={styles.text}>Hi, Samantha</ThemedText>
      <CategoryTabs/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    display: 'flex',
    gap: 20
    
  },
  text: {
    color: "white",
    fontSize: 40,
    fontFamily: "Inter_400Regular",
    padding: 16,
  },
});

export default MainSection;
