import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const albums = [
  {
    id: 1,
    title: "Starlit Reverie",
    artist: "Budiarti",
    songs: 8,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    title: "Midnight Confessions",
    artist: "Alexiao",
    songs: 24,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    title: "Lost in the Echo",
    artist: "Alexiao",
    songs: 24,
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
  },
  {
    id: 4,
    title: "Letters I Never Sent",
    artist: "Alexiao",
    songs: 24,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
  },
  {
    id: 5,
    title: "Breaking the Silence",
    artist: "Alexiao",
    songs: 24,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
  },
  {
    id: 6,
    title: "Tears on the Vinyl",
    artist: "Alexiao",
    songs: 24,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
  },
];

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  // Filter albums based on submitted search query
  const filteredAlbums = albums.filter((album) =>
    album.title.toLowerCase().includes(submittedQuery.toLowerCase())
  );

  const handleSearchSubmit = () => {
    setSubmittedQuery(searchQuery);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Link href="/">
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Link>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search Music</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={{ marginLeft: 12 }} />
        <TextInput
          placeholder="Search songs, albums, artists..."
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSearchSubmit}>
          <Ionicons name="arrow-forward-circle" size={28} color="#C4F34A" />
        </TouchableOpacity>
      </View>

      {/* Album List */}
      <ScrollView style={styles.albumList} showsVerticalScrollIndicator={false}>
        {filteredAlbums.length > 0 ? (
          filteredAlbums.map((album) => (
            <TouchableOpacity key={album.id} style={styles.albumItem}>
              <Image source={{ uri: album.image }} style={styles.albumImage} />
              <View style={styles.albumInfo}>
                <Text style={styles.albumTitle}>{album.title}</Text>
                <View style={styles.albumMeta}>
                  <Text style={styles.albumArtist}>By {album.artist}</Text>
                  <Text style={styles.albumDot}>•</Text>
                  <Text style={styles.albumSongs}>{album.songs} Songs</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.playButton}>
                <Ionicons name="play" size={20} color="#fff" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noResults}>
            <Text style={{ color: "#999", fontSize: 16 }}>No results found</Text>
          </View>
        )}
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(40, 40, 40, 0.95)",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 24,
    height: 44,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
  },
  submitButton: {
    marginRight: 8,
  },
  albumList: { flex: 1, paddingHorizontal: 20, marginTop: 8 },
  albumItem: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  albumImage: { width: 90, height: 90, borderRadius: 16, backgroundColor: "#222" },
  albumInfo: { flex: 1, marginLeft: 16 },
  albumTitle: { fontSize: 18, fontWeight: "600", color: "#fff", marginBottom: 6 },
  albumMeta: { flexDirection: "row", alignItems: "center" },
  albumArtist: { fontSize: 15, color: "#999" },
  albumDot: { fontSize: 15, color: "#999", marginHorizontal: 8 },
  albumSongs: { fontSize: 15, color: "#999" },
  playButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(60, 60, 60, 0.95)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  miniPlayer: {
    position: "absolute",
    bottom: 30,
    left: "50%",
    transform: [{ translateX: -100 }],
    width: 200,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(50, 50, 50, 0.95)",
    alignItems: "center",
    justifyContent: "center",
  },
  miniPlayerControls: { flexDirection: "row", alignItems: "center" },
  miniPlayerButton: { padding: 12 },
  miniPlayerDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginHorizontal: 8,
  },
  noResults: { flex: 1, alignItems: "center", justifyContent: "center", marginTop: 40 },
});

export default SearchScreen;
