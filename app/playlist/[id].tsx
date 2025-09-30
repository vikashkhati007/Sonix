import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
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
};

type Playlist = {
  id: string;
  name: string;
  songs: Song[];
  createdAt: string;
  thumbnail: string;
};

const { width } = Dimensions.get("window");

const PlaylistPage = () => {
  const { id } = useLocalSearchParams() as { id: string };
  const [playlist, setPlaylist] = useState<Playlist | null>(null);

  useEffect(() => {
    const loadPlaylist = async () => {
      try {
        const stored = await AsyncStorage.getItem("userPlaylists");
        if (stored) {
          const parsed: Playlist[] = JSON.parse(stored);
          const found = parsed.find((pl) => pl.id === id);
          setPlaylist(found || null);
        }
      } catch (err) {
        console.error("Error loading playlist:", err);
      }
    };

    loadPlaylist();
  }, [id]);

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
        <SafeAreaView style={styles.container}>
          {/* Playlist Header */}
          <ImageBackground
            blurRadius={5}
            source={{ uri: playlist.thumbnail }}
            style={styles.cover}
          />
          <View style={styles.header}>
            <View style={styles.headerTextWrap}>
              <ThemedText style={styles.title}>
                {playlist.name[0].toUpperCase() + playlist.name.slice(1)}
              </ThemedText>
              <ThemedText style={styles.subtitle}>
                {playlist.songs.length}{" "}
                {playlist.songs.length === 1 ? "song" : "songs"}
              </ThemedText>
              <TouchableOpacity style={styles.playButton}>
                <Ionicons name="play-circle" size={64} color="#D7FD50" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Songs List */}
          <FlatList
            data={playlist.songs}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 40 }}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={styles.songRow} activeOpacity={0.7}>
                <ThemedText style={styles.index}>{index + 1}</ThemedText>
                <Image
                  source={{ uri: item.thumbnails }}
                  style={styles.thumbnail}
                />
                <View style={styles.songMeta}>
                  <ThemedText style={styles.songTitle} numberOfLines={1}>
                    {item.name}
                  </ThemedText>
                  <ThemedText style={styles.songSubtitle} numberOfLines={1}>
                    {item.artistName} • {item.albumName}
                  </ThemedText>
                </View>
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  header: {},
  cover: {
    width: "100%",
    height: 350,
    borderRadius: 12,
    shadowColor: "#000",
  },
  headerTextWrap: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    marginTop: 4,
  },
  playButton: {
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  songRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  index: {
    width: 24,
    fontSize: 14,
    color: "rgba(255,255,255,0.4)",
    textAlign: "right",
    marginRight: 12,
  },
  thumbnail: {
    width: 52,
    height: 52,
    borderRadius: 6,
  },
  songMeta: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  songTitle: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  songSubtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    marginTop: 2,
  },
});

export default PlaylistPage;
