import { Ionicons } from "@expo/vector-icons";
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

const ActivityScreen = () => {
  const [selectedTab, setSelectedTab] = React.useState("All");

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
          <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
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

      {/* Album List */}
      <ScrollView style={styles.albumList} showsVerticalScrollIndicator={false}>
        {albums.map((album) => (
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
        ))}
      </ScrollView>

      {/* Mini Player
      <View style={styles.miniPlayer}>
        <View style={styles.miniPlayerControls}>
          <TouchableOpacity style={styles.miniPlayerButton}>
            <Ionicons name="play-skip-forward" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.miniPlayerDivider} />
          <TouchableOpacity style={styles.miniPlayerButton}>
            <Ionicons name="shuffle" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View> */}
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
  miniPlayerControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  miniPlayerButton: {
    padding: 12,
  },
  miniPlayerDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginHorizontal: 8,
  },
});

export default ActivityScreen;
