import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Song = {
  id: string;
  thumbnails: string;
  name: string;
  artistName: string;
  albumName: string;
  downloadLink?: string;
};

type Playlist = {
  id: string;
  name: string;
  description: string;
  songs: Song[];
  createdAt: string;
  thumbnail: string;
};

const { width, height } = Dimensions.get("window");

const PlaylistPage = () => {
  const { id } = useLocalSearchParams() as { id: string };
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadPlaylist = async () => {
      setLoading(true);
      try {
        // Check if ID is numeric (user playlist) or string (recommended)
        const isUserPlaylist = /^\d+$/.test(id);

        if (isUserPlaylist) {
          // Fetch from AsyncStorage for user playlists
          const userPlaylistsJson = await AsyncStorage.getItem("userPlaylists");
          if (userPlaylistsJson) {
            const userPlaylists: Playlist[] = JSON.parse(userPlaylistsJson);
            const userPlaylist = userPlaylists.find((p) => p.id === id);
            if (userPlaylist) {
              setPlaylist(userPlaylist);
            } else {
              setPlaylist(null);
            }
          } else {
            setPlaylist(null);
          }
        } else {
          // Fetch from API for recommended playlists
          const response = await fetch("/playlist", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ playlistID: id }),
          });
          if (!response.ok) throw new Error("Fetch failed");
          const data = await response.json();
          data;
          if (data.response) {
            const apiSongs = data.response.playlistSongs || [];
            setPlaylist({
              id,
              name: data.response.playlisttitle || "",
              description: data.response.playlistdescription || "",
              thumbnail: data.response.thumbnailUrl?.[0]?.url || "",
              songs: apiSongs.map((s: any) => ({
                id: s.videoID,
                thumbnails: `https://img.youtube.com/vi/${s.videoID}/mqdefault.jpg`,
                name: s.songTitle || "",
                artistName: s.songArtist || "",
                albumName: "",
              })),
              createdAt: new Date().toISOString(),
            });
          } else {
            setPlaylist(null);
          }
        }
      } catch (error) {
        console.error("Error fetching playlist:", error);
        setPlaylist(null);
      } finally {
        setLoading(false);
      }
    };

    loadPlaylist();
  }, [id]);

  const handlePlaySong = (song: Song, index: number) => {
    router.push({
      pathname: "/player/[id]",
      params: {
        id: song.id,
        thumbnails: song.thumbnails,
        name: song.name,
        artistName: song.artistName,
        albumName: song.albumName,
        playlistId: playlist?.id,
        songs: JSON.stringify(playlist?.songs || []),
        currentIndex: index.toString(),
      },
    });
  };

  const handlePlayAll = () => {
    if (playlist && playlist.songs.length > 0) {
      handlePlaySong(playlist.songs[0], 0);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#D7FD50" />
        <ThemedText style={styles.loadingText}>Loading playlist...</ThemedText>
      </SafeAreaView>
    );
  }

  if (!playlist) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedText>No playlist found</ThemedText>
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <LinearGradient
        colors={["#1a1a1a", "#000"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView style={styles.safeContainer}>
          {/* Header Section */}
          <View style={styles.headerContainer}>
            <ImageBackground
              blurRadius={10}
              source={{ uri: playlist.thumbnail }}
              style={styles.cover}
              imageStyle={styles.coverImage}
              resizeMode="cover"
            >
              <LinearGradient
                colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.4)"]}
                style={styles.coverOverlay}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              />
            </ImageBackground>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.headerOverlay}>
              <View style={styles.headerTextWrap}>
                <ThemedText style={styles.title}>
                  {playlist.name.slice(0, 1).toUpperCase() +
                    playlist.name.slice(1)}
                </ThemedText>
                {playlist.description ? (
                  <ThemedText style={styles.description} numberOfLines={2}>
                    <ThemedText style={styles.subtitle}>
                      {playlist.songs.length}{" "}
                      {playlist.songs.length === 1 ? "song" : "songs"} •
                    </ThemedText>
                    {playlist.description}
                  </ThemedText>
                ) : null}

                <TouchableOpacity
                  style={styles.playButton}
                  onPress={handlePlayAll}
                  disabled={playlist.songs.length === 0}
                >
                  <View style={styles.playButtonInner}>
                    <Ionicons name="play" size={24} color="#000" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Songs List */}
          <View style={styles.songsContainer}>
            <FlatList
              data={playlist.songs}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={styles.songRow}
                  activeOpacity={0.7}
                  onPress={() => handlePlaySong(item, index)}
                >
                  <ThemedText style={styles.index}>{index + 1}</ThemedText>
                  <Image
                    source={{ uri: item.thumbnails }}
                    style={styles.thumbnail}
                    resizeMode="cover"
                  />
                  <View style={styles.songMeta}>
                    <ThemedText style={styles.songTitle} numberOfLines={1}>
                      {item.name}
                    </ThemedText>
                    <ThemedText style={styles.songSubtitle} numberOfLines={1}>
                      {item.artistName}
                    </ThemedText>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={24}
                    color="rgba(255,255,255,0.4)"
                  />
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <ThemedText style={styles.emptyText}>
                    No songs in this playlist yet
                  </ThemedText>
                </View>
              }
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "rgba(255,255,255,0.7)",
  },
  headerContainer: {
    height: height * 0.45,
    width: width,
    position: "relative",
    marginBottom: -60,
    borderRadius: 20,
    overflow: "hidden",
  },
  cover: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  coverImage: {
    borderRadius: 20,
  },
  coverOverlay: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
    padding: 8,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
  },
  headerImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 80,
    paddingTop: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  headerTextWrap: {
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    paddingHorizontal: 20,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  description: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    width: width * 0.75,
    lineHeight: 20,
    marginTop: 4,
  },
  playButton: {
    borderWidth: 2,
    borderColor: "#D7FD50",
    borderRadius: 40,
    padding: 4,
    marginTop: 8,
  },
  playButtonInner: {
    backgroundColor: "#D7FD50",
    borderRadius: 36,
    width: 72,
    height: 72,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  songsContainer: {
    flex: 1,
    marginTop: 60,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginHorizontal: -16,
  },
  songRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    minHeight: 72,
  },
  index: {
    width: 24,
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    marginRight: 12,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  songMeta: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  songTitle: {
    fontSize: 17,
    color: "#fff",
    fontWeight: "600",
  },
  songSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    marginTop: 2,
  },
  emptyContainer: {
    flex: 1,
    paddingVertical: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "rgba(255,255,255,0.5)",
    textAlign: "center",
  },
});

export default PlaylistPage;
