import { ThemedText } from "@/components/themed-text";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar } from "react-native-elements";
import { ThemedView } from "../../themed-view";

const Header = () => {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.otherContainer}>
          <ThemedText style={styles.text}>Hi, Samantha</ThemedText>
        </View>
        <Avatar
          rounded
          source={{
            uri: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
          }}
          size="medium"
          avatarStyle={styles.profileImage}
        />
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "black",
  },
  text: {
    color: "white",
    fontSize: 30,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  otherContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  profileImage: {
    borderRadius: 50, // optional if you want it circular
    borderWidth: 2,
    borderColor: "white",
  },
  icon: {
    backgroundColor: "#1C1C29",
    padding: 10,
    borderRadius: "50%",
  },
});

export default Header;
