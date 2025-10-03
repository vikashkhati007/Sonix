import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import * as NavigationBar from "expo-navigation-bar";
import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function CustomTabIcon({ name, isActive, Component }: any) {
  return (
    <View style={[styles.iconWrap, isActive && styles.iconActiveBg]}>
      <Component name={name} size={27} color={isActive ? "#181828" : "#fff"} />
    </View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    // Hide Android navigation bar (immersive mode)
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("overlay-swipe");
  }, []);

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          bottom: insets.bottom + 10, // adjusts for safe area
          backgroundColor: "rgba(32,33,38,0.92)",
          borderRadius: 50,
          height: 70, // consistent height across devices
          borderTopWidth: 0,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          elevation: 5, // shadow on Android
          shadowColor: "#000", // shadow on iOS
          shadowOpacity: 0.15,
          shadowOffset: { width: 0, height: 3 },
          shadowRadius: 5,
          marginHorizontal: 30,
        },
        tabBarItemStyle: {
          marginVertical: 30, // keeps icons centered
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon
              name="house"
              isActive={focused}
              Component={FontAwesome6}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon
              name="magnifying-glass"
              isActive={focused}
              Component={FontAwesome6}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon
              name="heart"
              isActive={focused}
              Component={FontAwesome6}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon
              name="settings-outline"
              isActive={focused}
              Component={Ionicons}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  iconActiveBg: {
    backgroundColor: "#D7FD50",
  },
});
