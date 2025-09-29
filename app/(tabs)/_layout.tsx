import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

function CustomTabIcon({ name, isActive, Component }: any) {
  return (
    <View style={[styles.iconWrap, isActive && styles.iconActiveBg]}>
      <Component name={name} size={27} color={isActive ? "#181828" : "#fff"} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="index" // Home active by default
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 25,
          backgroundColor: "rgba(32,33,38,0.92)",
          borderRadius: 50,
          height: 80,
          borderTopWidth: 0,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          paddingHorizontal: 16,
          marginHorizontal: 30,
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
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  iconActiveBg: {
    backgroundColor: "#D7FD50",
  },
});
