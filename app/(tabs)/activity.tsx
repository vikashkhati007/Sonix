import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Static albums list for "All" fallback (optional, can be removed if only want dynamic)
const albums: string | any[] = [];

const ActivityScreen = () => {
  const [selectedTab, setSelectedTab] = React.useState("All");
  const [likedSongs, setLikedSongs] = React.useState<any>([]);
  const [recentSongs, setRecentSongs] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  // Load liked/recent songs from AsyncStorage as needed
  React.useEffect(() => {
    if (selectedTab === "Liked Songs") {
      loadLikedSongs();
    } else if (selectedTab === "Recent Viewed") {
      loadRecentSongs();
    } else if (selectedTab === "All") {
      loadAllSongs();
    }
  }, [selectedTab]);

  // Always update both recent and liked in All for combination
  const loadAllSongs = async () => {
    setIsLoading(true);
    try {
      const [liked, recent] = await Promise.all([
        AsyncStorage.getItem('likedSongs'),
        AsyncStorage.getItem('recentSongs'),
      ]);
      setLikedSongs(liked ? JSON.parse(liked) : []);
      setRecentSongs(recent ? JSON.parse(recent) : []);
    } catch (e) {
      setLikedSongs([]);
      setRecentSongs([]);
    }
    setIsLoading(false);
  };

  const loadLikedSongs = async () => {
    setIsLoading(true);
    try {
      const storedLikedSongs = await AsyncStorage.getItem('likedSongs');
      setLikedSongs(storedLikedSongs ? JSON.parse(storedLikedSongs) : []);
    } catch (e) {
      setLikedSongs([]);
    }
    setIsLoading(false);
  };

  const loadRecentSongs = async () => {
    setIsLoading(true);
    try {
      const storedRecentSongs = await AsyncStorage.getItem('recentSongs');
      setRecentSongs(storedRecentSongs ? JSON.parse(storedRecentSongs) : []);
    } catch (e) {
      setRecentSongs([]);
    }
    setIsLoading(false);
  };

  // Get the data to show for the current tab
  let itemsToShow = [];
  if (selectedTab === 'Liked Songs') {
    itemsToShow = likedSongs.map((song:any) => ({
      id: song.id,
      title: song.albumName || song.name,
      artist: song.artistName,
      image: song.thumbnails,
      source: 'Liked',
    }));
  } else if (selectedTab === 'Recent Viewed') {
    itemsToShow = recentSongs.map((song:any) => ({
      id: song.id,
      title: song.albumName || song.name,
      artist: song.artistName,
      image: song.thumbnails,
      source: 'Recent',
    }));
  } else if (selectedTab === 'All') {
    // Combine liked and recent, unique by id, most recent first
    const combined = [...recentSongs, ...likedSongs];
    const uniqueMap:any = {};
    for (const song of combined) {
      if (!uniqueMap[song.id]) {
        uniqueMap[song.id] = {
          id: song.id,
          title: song.albumName || song.name,
          artist: song.artistName,
          image: song.thumbnails,
          source: song.likedAt ? 'Liked' : 'Recent', // Just for info
        };
      }
    }
    itemsToShow = Object.values(uniqueMap);
    // Optionally, if you want to add static albums when both lists are empty
    if(itemsToShow.length === 0 && albums.length) {
      itemsToShow = albums;
    }
  }

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
        <Text style={styles.headerTitle}>My Music</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Link href="/playlist/playlist">
            <Ionicons name="list-outline" size={24} color="#fff" />
          </Link>
        </TouchableOpacity>
      </View>
      {/* Tab Navigation */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabContainer}
        contentContainerStyle={styles.tabContent}
      >
        {["All", "Recent Viewed", "Liked Songs"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.tabActive]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.tabTextActive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Content */}
      {isLoading ? (
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 40 }}>Loading...</Text>
      ) : (
      <ScrollView style={styles.albumList} showsVerticalScrollIndicator={false}>
        {itemsToShow.length > 0 ? (
          itemsToShow.map((album:any) => (
            <TouchableOpacity key={album.id} style={styles.albumItem}>
              <Image source={{ uri: album.image }} style={styles.albumImage} />
              <View style={styles.albumInfo}>
                <Text style={styles.albumTitle}>{album.title}</Text>
                <View style={styles.albumMeta}>
                  <Text style={styles.albumArtist}>By {album.artist}</Text>
                  {album.source ? (
                    <Text style={[styles.albumDot, { color: album.source==="Liked" ? "#C4F34A" : "#0af"}]}>• {album.source}</Text>
                  ) : (
                    <Text style={styles.albumDot}>•</Text>
                  )}
                </View>
              </View>
              <TouchableOpacity style={styles.playButton}>
                  <Link
                  href={{
                    pathname: "/player/[id]",
                    params: {
                      id: album.id,
                      thumbnails: album.image,
                      name: album.title,
                      artistName: album.artist,
                      albumName: album.title,
                    },
                  }}
                >
                <Ionicons name="play" size={20} color="#fff" />
                </Link>
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{ color: '#fff', textAlign: 'center', marginTop: 40 }}>
            {selectedTab === "Liked Songs"
              ? "No liked songs yet."
              : selectedTab === "Recent Viewed"
              ? "No recently viewed songs yet."
              : "No music found."}
          </Text>
        )}
      </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
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
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  tabContainer: {
    maxHeight: 60,
    paddingLeft: 20,
    marginTop: 4,
  },
  tabContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 20,
    gap: 10,
  },
  tab: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: "rgba(40, 40, 40, 0.95)",
    minWidth: 80,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: "#C4F34A",
  },
  tabText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  tabTextActive: {
    color: "#000",
  },
  albumList: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  albumItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  albumImage: {
    width: 90,
    height: 90,
    borderRadius: 16,
    backgroundColor: "#222",
  },
  albumInfo: {
    flex: 1,
    marginLeft: 16,
  },
  albumTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 6,
  },
  albumMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  albumArtist: {
    fontSize: 15,
    color: "#999",
  },
  albumDot: {
    fontSize: 15,
    color: "#999",
    marginHorizontal: 8,
  },
  albumSongs: {
    fontSize: 15,
    color: "#999",
  },
  playButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(60, 60, 60, 0.95)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
});

export default ActivityScreen;
