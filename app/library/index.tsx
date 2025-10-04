import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Playlist {
  id: string;
  name: string;
  songs: any[];
  createdAt: string;
  thumbnail?: string;
}

export default function PlaylistScreen() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const router = useRouter();

  useEffect(() => {
    loadPlaylists();
  }, []);

  const loadPlaylists = async () => {
    try {
      const stored = await AsyncStorage.getItem("userPlaylists");
      if (stored) {
        const parsedPlaylists = JSON.parse(stored);
        // Sort by creation date (newest first)
        parsedPlaylists.sort(
          (a: Playlist, b: Playlist) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setPlaylists(parsedPlaylists);
      }
    } catch (error) {
      console.error("Error loading playlists:", error);
    }
  };

  const savePlaylists = async (updatedPlaylists: Playlist[]) => {
    try {
      await AsyncStorage.setItem("userPlaylists", JSON.stringify(updatedPlaylists));
      setPlaylists(updatedPlaylists);
    } catch (error) {
      console.error("Error saving playlists:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPlaylists();
    setRefreshing(false);
  };

  const createNewPlaylist = async () => {
    if (!newPlaylistName.trim()) {
      Alert.alert("Error", "Please enter a playlist name");
      return;
    }

    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name: newPlaylistName.trim(),
      songs: [],
      createdAt: new Date().toISOString(),
    };

    const updatedPlaylists = [newPlaylist, ...playlists];
    await savePlaylists(updatedPlaylists);

    Alert.alert("Success", `Playlist "${newPlaylistName}" created!`);
    setNewPlaylistName("");
    setShowCreateModal(false);
  };

  const deletePlaylist = (playlist: Playlist) => {
    Alert.alert(
      "Delete Playlist",
      `Are you sure you want to delete "${playlist.name}"? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const updatedPlaylists = playlists.filter((p) => p.id !== playlist.id);
            await savePlaylists(updatedPlaylists);
            Alert.alert("Deleted", `"${playlist.name}" has been deleted`);
          },
        },
      ]
    );
  };

  const handlePlaylistPress = (playlist: Playlist) => {
    // Navigate to playlist detail screen
    router.push(`/library/${playlist.id}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays} days ago`;
    if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays <= 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const renderPlaylistCard = ({ item }: { item: Playlist }) => (
    <TouchableOpacity
      style={styles.playlistCard}
      onPress={() => handlePlaylistPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.cardThumbnailContainer}>
        {item.thumbnail ? (
          <Image source={{ uri: item.thumbnail }} style={styles.cardThumbnail} />
        ) : (
          <View style={[styles.cardThumbnail, styles.placeholderThumbnail]}>
            <MaterialCommunityIcons name="music-note-outline" size={40} color="rgba(255,255,255,0.3)" />
          </View>
        )}
        <View style={styles.songCountBadge}>
          <Text style={styles.songCountText}>{item.songs.length}</Text>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.cardSubtitle}>
          {item.songs.length} song{item.songs.length !== 1 ? "s" : ""} • {formatDate(item.createdAt)}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => deletePlaylist(item)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Feather name="trash-2" size={20} color="rgba(255,255,255,0.5)" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <MaterialCommunityIcons name="playlist-music-outline" size={80} color="rgba(255,255,255,0.2)" />
      </View>
      <Text style={styles.emptyTitle}>No Playlists Yet</Text>
      <Text style={styles.emptySubtitle}>
        Create your first playlist to organize your favorite songs
      </Text>
      <TouchableOpacity
        style={styles.emptyCreateBtn}
        onPress={() => setShowCreateModal(true)}
      >
        <Feather name="plus" size={20} color="#000" />
        <Text style={styles.emptyCreateText}>Create Playlist</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Your Playlists</Text>
          <Text style={styles.headerSubtitle}>
            {playlists.length} playlist{playlists.length !== 1 ? "s" : ""}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.createHeaderBtn}
          onPress={() => setShowCreateModal(true)}
        >
          <Feather name="plus" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Playlists List */}
      <FlatList
        data={playlists}
        renderItem={renderPlaylistCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          playlists.length === 0 && styles.emptyListContent,
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#D7FD50"
            colors={["#D7FD50"]}
          />
        }
        ListEmptyComponent={<EmptyState />}
      />

      {/* Create Playlist Modal */}
      <Modal
        visible={showCreateModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create New Playlist</Text>
              <TouchableOpacity onPress={() => setShowCreateModal(false)}>
                <Ionicons name="close" size={28} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalContent}>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="playlist-music"
                  size={24}
                  color="rgba(255,255,255,0.4)"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.playlistInput}
                  placeholder="Playlist name"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  value={newPlaylistName}
                  onChangeText={setNewPlaylistName}
                  autoFocus
                  maxLength={50}
                />
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalBtn, styles.cancelBtn]}
                  onPress={() => {
                    setShowCreateModal(false);
                    setNewPlaylistName("");
                  }}
                >
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalBtn, styles.confirmBtn]}
                  onPress={createNewPlaylist}
                >
                  <Text style={styles.confirmBtnText}>Create</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: "rgba(255,255,255,0.6)",
  },
  createHeaderBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#D7FD50",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#D7FD50",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emptyListContent: {
    flex: 1,
  },
  playlistCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  cardThumbnailContainer: {
    position: "relative",
    marginRight: 14,
  },
  cardThumbnail: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },
  placeholderThumbnail: {
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  songCountBadge: {
    position: "absolute",
    bottom: -6,
    right: -6,
    backgroundColor: "#D7FD50",
    borderRadius: 12,
    minWidth: 28,
    height: 24,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#000",
  },
  songCountText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "700",
  },
  cardContent: {
    flex: 1,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
  },
  deleteBtn: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingTop: 60,
  },
  emptyIconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255,255,255,0.03)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.05)",
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 12,
  },
  emptySubtitle: {
    fontSize: 15,
    color: "rgba(255,255,255,0.5)",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  emptyCreateBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D7FD50",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 25,
    shadowColor: "#D7FD50",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  emptyCreateText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#1a1a1a",
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  modalContent: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 12,
  },
  playlistInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    paddingVertical: 16,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelBtn: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  confirmBtn: {
    backgroundColor: "#D7FD50",
    shadowColor: "#D7FD50",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  cancelBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  confirmBtnText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
  },
});