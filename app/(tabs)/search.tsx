import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getThumbnailUri } from "../../constants/helper";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterType, setFilterType] = useState("default");

  // Search (POST request)
  const handleSearchSubmit = async () => {
    if (!searchQuery.trim()) {
      setSongs([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://apiprojects.vercel.app/api/musicplayer/search`, {
        method: "POST",
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await response.json();
      if (Array.isArray(data.response)) {
        setSongs(data.response);
      } else {
        setSongs([]);
      }
    } catch (err) {
      console.error("Error searching music:", err);
      setSongs([]);
    } finally {
      setLoading(false);
    }
  };

  // Apply filter
  const applyFilter = (type: string) => {
    setFilterType(type);
    let sortedSongs = [...songs];

    switch (type) {
      case "a-z":
        sortedSongs.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "z-a":
        sortedSongs.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "artist":
        sortedSongs.sort((a, b) =>
          (a.artist?.name || "").localeCompare(b.artist?.name || "")
        );
        break;
      default:
        // keep as is
        break;
    }

    setSongs(sortedSongs);
    setFilterVisible(false);
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
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setFilterVisible(true)}
        >
          <Ionicons name="filter-outline" size={24} color="#fff" />
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
          songs.map((song) => {
            const thumbnailUri = getThumbnailUri(song);
            return (
              <TouchableOpacity key={song.videoId} style={styles.albumItem}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: thumbnailUri }}
                    style={styles.albumImage}
                    resizeMode="cover"
                    onError={(error) => {
                      console.error(
                        `Image failed for ${song.name} (ID: ${song.videoId}):`,
                        error.nativeEvent.error
                      );
                    }}
                  />
                </View>
                <View style={styles.albumInfo}>
                  <Text style={styles.albumTitle}>{song.name}</Text>
                  <View style={styles.albumMeta}>
                    <Text style={styles.albumArtist}>
                      By {song.artist?.name}
                    </Text>
                    <Text style={styles.albumDot}>•</Text>
                    <Text style={styles.albumSongs}>{song.album?.name}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.playButton}>
                  <Link
                    href={{
                      pathname: "/player/[id]",
                      params: {
                        id: song.videoId,
                        thumbnails: thumbnailUri, // Pass the generated URI
                        name: song.name,
                        artistName: song.artist?.name,
                        albumName: song.album?.name,
                      },
                    }}
                  >
                    <Ionicons name="play" size={20} color="#fff" />
                  </Link>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.noResults}>
            <Text style={{ color: "#999", fontSize: 16 }}>
              No results found
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={filterVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setFilterVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setFilterVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sort Songs</Text>
            {[
              { label: "A - Z", value: "a-z" },
              { label: "Z - A", value: "z-a" },
              { label: "By Artist", value: "artist" },
            ].map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.modalOption}
                onPress={() => applyFilter(option.value)}
              >
                <Text style={styles.modalOptionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
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
  submitButton: {},
  albumList: { flex: 1, paddingHorizontal: 20, marginTop: 20 },
  albumItem: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    overflow: "hidden", // Ensures square cropping and no overflow
    backgroundColor: "#222",
  },
  albumImage: {
    flex: 1, // Fills the container
    width: undefined, // Allows flex to handle sizing
    height: undefined,
  },
  albumInfo: { flex: 1, marginLeft: 16 },
  albumTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 6,
  },
  albumMeta: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
  albumArtist: { fontSize: 12, color: "#999" },
  albumDot: { fontSize: 15, color: "#999", marginHorizontal: 8 },
  albumSongs: { fontSize: 12, color: "#999" },
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: 32,
  },
  modalContent: {
    backgroundColor: "#222",
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 12,
  },
  modalOption: { paddingVertical: 12 },
  modalOptionText: { fontSize: 16, color: "#C4F34A" },
});

export default SearchScreen;