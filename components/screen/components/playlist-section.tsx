import { Inter_400Regular, useFonts } from "@expo-google-fonts/inter";
import { AntDesign } from "@expo/vector-icons";
import { SplashScreen } from "expo-router";
import React, { useEffect } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const playlists = [
  {
    name: "Starlit Reverie",
    author: "Budiarti",
    songs: 8,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
  },
  {
    name: "Midnight Confessions",
    author: "Elena",
    songs: 14,
    image: "https://images.unsplash.com/photo-1502720705749-3cfa1248f3df",
  },
  {
    name: "Dream Pop",
    author: "Yunus",
    songs: 9,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
  },
  {
    name: "Golden Hour",
    author: "Luna",
    songs: 12,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
  {
    name: "Neon Nights",
    author: "Kai",
    songs: 10,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
  },
  {
    name: "Chill Vibes",
    author: "Mira",
    songs: 16,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
  },
  {
    name: "Retro Wave",
    author: "Nico",
    songs: 11,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
  },
  {
    name: "Acoustic Sessions",
    author: "Sofia",
    songs: 9,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
  },
  // Add more as needed
];

export default function TopPlaylistSection() {
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
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Top daily playlists</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollCol}>
        {playlists.map((pl, idx) => (
          <View style={styles.itemRow} key={idx}>
            <Image source={{ uri: pl.image }} style={styles.playlistImage} />
            <View style={styles.textCol}>
              <Text style={styles.playlistTitle}>{pl.name}</Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <Text style={styles.metaAuthor}>By {pl.author}</Text>
                <View style={styles.dot} />
                <Text style={styles.metaSongs}>{pl.songs} Songs</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.iconButton}>
              <View style={styles.iconCircle}>
                <AntDesign name="play-circle" size={28} color="#bfbfff" />
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 22,
    color: "#fff",
    fontFamily: "Inter_400Regular",
  },
  seeAll: {
    color: "#bfbfff",
    fontSize: 15,
  },
  scrollCol: {
    flexDirection: "column",
    gap: 6,
    paddingHorizontal: 8,
    paddingBottom: 2,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 64,
    paddingVertical: 7,
    paddingHorizontal: 4,
    gap: 14,
  },
  playlistImage: {
    width: 54,
    height: 54,
    borderRadius: 16, // "squircle"
    backgroundColor: "#232435",
  },
  textCol: {
    flex: 1,
  },
  playlistTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 2,
  },
  metaAuthor: {
    color: "#bfbfff",
    fontSize: 13.5,
    fontWeight: "500",
    marginTop: 1,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: "#bfbfff",
    marginHorizontal: 3,
    marginTop: 2,
  },
  metaSongs: {
    color: "#bfbfff",
    fontSize: 13.5,
    fontWeight: "500",
    marginTop: 1,
  },
  iconButton: {
    marginLeft: 6,
  },
  iconCircle: {
    backgroundColor: "#22232f",
    borderRadius: 999,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
});
