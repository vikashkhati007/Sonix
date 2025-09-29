import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch default songs
  const fetchDefaultSongs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/musicdata");
      const data = await res.json();
      if (Array.isArray(data.response)) {
        setSongs(data.response);
      } else {
        console.error("Unexpected API format:", data);
        setSongs([]);
      }
    } catch (err) {
      console.error("Error fetching music data:", err);
      setSongs([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchDefaultSongs();
  }, []);

  // Search (POST request)
  const handleSearchSubmit = async () => {
    if (!searchQuery.trim()) {
      // if input empty → reload default list
      fetchDefaultSongs();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/musicdata", {
        method: "POST",
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await response.json();
      if (Array.isArray(data.response)) {
        setSongs(data.response); // replace old songs
      } else {
        console.error("Unexpected API format:", data);
        setSongs([]);
      }
    } catch (err) {
      console.error("Error searching music:", err);
      setSongs([]);
    } finally {
      setLoading(false);
    }
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
        <Ionicons
          name="search"
          size={20}
          color="#999"
          style={{ marginLeft: 12 }}
        />
        <TextInput
          placeholder="Search songs, albums, artists..."
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="search"
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSearchSubmit}
        >
          <Ionicons name="arrow-forward-circle" size={28} color="#C4F34A" />
        </TouchableOpacity>
      </View>

      {/* Song List */}
      <ScrollView style={styles.albumList} showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#C4F34A"
            style={{ marginTop: 40 }}
          />
        ) : songs.length > 0 ? (
          songs.map((song) => (
            <TouchableOpacity key={song.videoId} style={styles.albumItem}>
              <Image
                source={{
                  uri: song.thumbnails?.[1]?.url || song.thumbnails?.[0]?.url,
                }}
                style={styles.albumImage}
              />
              <View style={styles.albumInfo}>
                <Text style={styles.albumTitle}>{song.name}</Text>
                <View style={styles.albumMeta}>
                  <Text style={styles.albumArtist}>By {song.artist?.name}</Text>
                  <Text style={styles.albumDot}>•</Text>
                  <Text style={styles.albumSongs}>{song.album?.name}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.playButton}>
                <Ionicons name="play" size={20} color="#fff" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noResults}>
            <Text style={{ color: "#999", fontSize: 16 }}>
              No results found
            </Text>
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
  submitButton: { marginRight: 8 },
  albumList: { flex: 1, paddingHorizontal: 20, marginTop: 8 },
  albumItem: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  albumImage: {
    width: 90,
    height: 90,
    borderRadius: 16,
    backgroundColor: "#222",
  },
  albumInfo: { flex: 1, marginLeft: 16 },
  albumTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 6,
  },
  albumMeta: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
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
  noResults: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
});

export default SearchScreen;
