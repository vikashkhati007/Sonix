import {
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

// Helper to render icons with active circular accent
function CustomTabIcon({
  name,
  isActive,
  Component,
}: {
  name: string;
  isActive: boolean;
  Component: any;
}) {
  return (
    <View style={[styles.iconWrap, isActive && styles.iconActiveBg]}>
      <Component name={name} size={27} color={isActive ? "#181828" : "#fff"} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 22,
          elevation: 10,
          backgroundColor: "rgba(32,33,38,0.92)",
          borderRadius: 50,
          height: 90, // Reduce from 100 to 90
          borderTopWidth: 0,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around", // Change from space-between
          paddingHorizontal: 16, // Reduce padding
          paddingVertical: 8, // Add vertical padding for better centering
          marginHorizontal: 30,
        },

        tabBarItemStyle: {},
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
        name="(music)"
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon
              name="music-box"
              isActive={focused}
              Component={MaterialCommunityIcons}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="exchange"
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon
              name="repeat"
              isActive={focused}
              Component={MaterialCommunityIcons}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon
              name="book"
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
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    // Remove this line: position: 'absolute',
  },
  iconActiveBg: {
    backgroundColor: "#D7FD50",
  },
});
