import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const settingsOptions = [
  { id: 1, title: "Account", icon: "person-outline" },
  { id: 2, title: "Notifications", icon: "notifications-outline" },
  { id: 3, title: "Theme", icon: "color-palette-outline" },
  { id: 4, title: "About", icon: "information-circle-outline" },
  { id: 5, title: "Logout", icon: "log-out-outline" },
];

const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Link href="/">
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Link>
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Settings</ThemedText>
        <View style={{ width: 44 }} /> {/* placeholder for right icon */}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingsOptions.map((option) => (
          <TouchableOpacity key={option.id} style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <Ionicons name={option.icon as any} size={24} color="#C4F34A" />
              <Text style={styles.optionText}>{option.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { fontSize: 20, fontWeight: "600", color: "#fff" },
  content: { marginTop: 20 },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  optionLeft: { flexDirection: "row", alignItems: "center" },
  optionText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
    marginLeft: 16,
  },
});

export default SettingsScreen;
