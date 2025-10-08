import React from "react";
import { StyleSheet, View } from "react-native";
import CategoryTabs from "./screen/components/category";

const MainSection = () => {
  return (
    <View style={styles.container}>
      <CategoryTabs />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    display: "flex",
    gap: 20,
  },
});

export default MainSection;
