import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar } from "react-native-elements";
import { ThemedView } from "../../themed-view";

const Header = () => {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.headerContainer}>
        <Avatar
          rounded
          source={{
            uri: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
          }}
          size="medium"
          avatarStyle={styles.profileImage}
        />
        <View style={styles.iconContainer}>
          <Link href="/activity?tab=Liked Songs" asChild>
            <View style={styles.iconWrapper}>
              <Ionicons
                style={styles.iconStyle}
                name="heart-outline"
                size={28}
                color="white"
              />
            </View>
          </Link>
          <Link href="/library" asChild>
            <View style={styles.iconWrapper}>
              <Ionicons
                style={styles.iconStyle}
                name="albums-outline"
                size={28}
                color="white"
              />
            </View>
          </Link>
        </View>
      </View>
      <View style={styles.greetingContainer}>
        <ThemedText style={styles.greetingText}>Hi, Samantha</ThemedText>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 20,
  },
  iconWrapper: {
    backgroundColor: "#1E1E23",
    padding: 10,
    borderRadius: 48,
  },
  iconStyle: {},
  greetingContainer: {
    marginTop: 8,
  },
  greetingText: {
    color: "white",
    fontSize: 32,
    paddingVertical: 8,
  },
  profileImage: {
    borderRadius: 60,
  },
});

export default Header;
