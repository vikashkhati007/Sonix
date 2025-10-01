import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Slider } from "react-native-elements";

interface Playlist {
  id: string;
  name: string;
  songs: any[];
  createdAt: string;
  thumbnail?: string;
}

export default function PlayerScreen({
  id,
  thumbnails,
  name,
  artistName,
  albumName,
}: {
  id: string;
  thumbnails: string;
  name: string;
  artistName: string;
  albumName: string;
}) {
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likedSongs, setLikedSongs] = useState<any[]>([]);
  const [downloadLink, setDownloadLink] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);
  const [playlist, setPlaylist] = useState<any[]>([]);
  const [allSongs, setAllSongs] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const soundRef = useRef<Audio.Sound | null>(null);
  const router = useRouter();

  // Fetch Request to get song link - Optimized for fast loading
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        
        // First, check if download link exists in recent songs or liked songs
        const existingLink = await getExistingDownloadLink(id);
        
        if (existingLink) {
          // Use existing download link
          setDownloadLink(existingLink);
          await addToRecentSongs(existingLink);
          await loadAllSongs();
          await loadAndPlayImmediately(existingLink);
        } else {
          // Fetch new download link from API
          const result = await fetch("/download?id=" + id);
          if (!result.ok) throw new Error("Network response was not ok");
          const data = await result.json();
          const link = data.response.directLink;
          setDownloadLink(link);
          
          // Save to recent songs with download link
          await addToRecentSongs(link);
          
          // Reload all songs after adding to recent
          await loadAllSongs();
          
          // Auto-load and play immediately after getting link
          if (link) {
            await loadAndPlayImmediately(link);
          }
        }
      } catch (error) {
        console.error("Failed to fetch download link:", error);
        Alert.alert("Error", "Failed to fetch download link.");
        setIsLoading(false);
      }
    })();
  }, [id]);

  // Cleanup old sound when id changes
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    };
  }, [id]);

  // Load liked songs and playlist
  useEffect(() => {
    loadLikedSongs();
    loadPlaylist();
    loadAllSongs();
  }, []);

  // Update current index when song changes
  useEffect(() => {
    const index = allSongs.findIndex((song) => song.id === id);
    setCurrentIndex(index);
  }, [id, allSongs]);

  // Check if song is liked
  useEffect(() => {
    const songIsLiked = likedSongs.some((song) => song.id === id);
    setIsLiked(songIsLiked);
  }, [likedSongs, id]);

  const loadLikedSongs = async () => {
    try {
      const storedLikedSongs = await AsyncStorage.getItem("likedSongs");
      if (storedLikedSongs) {
        setLikedSongs(JSON.parse(storedLikedSongs));
      }
    } catch (error) {
      console.error("Error loading liked songs:", error);
    }
  };

  const loadPlaylist = async () => {
    try {
      const storedPlaylist = await AsyncStorage.getItem("currentPlaylist");
      if (storedPlaylist) {
        setPlaylist(JSON.parse(storedPlaylist));
      }
    } catch (error) {
      console.error("Error loading playlist:", error);
    }
  };

  const loadAllSongs = async () => {
    try {
      const recentSongsStr = await AsyncStorage.getItem("recentSongs");
      const likedSongsStr = await AsyncStorage.getItem("likedSongs");
      
      const recentSongs = recentSongsStr ? JSON.parse(recentSongsStr) : [];
      const likedSongs = likedSongsStr ? JSON.parse(likedSongsStr) : [];
      
      // Combine recent and liked songs, remove duplicates based on id
      const combinedSongs = [...recentSongs, ...likedSongs];
      const uniqueSongs = Array.from(
        new Map(combinedSongs.map((song) => [song.id, song])).values()
      );
      
      setAllSongs(uniqueSongs);
    } catch (error) {
      console.error("Error loading all songs:", error);
    }
  };

  const getExistingDownloadLink = async (songId: string): Promise<string | null> => {
    try {
      // Check in recent songs
      const recentSongsStr = await AsyncStorage.getItem("recentSongs");
      if (recentSongsStr) {
        const recentSongs = JSON.parse(recentSongsStr);
        const song = recentSongs.find((s: any) => s.id === songId);
        if (song && song.downloadLink) {
          return song.downloadLink;
        }
      }

      // Check in liked songs
      const likedSongsStr = await AsyncStorage.getItem("likedSongs");
      if (likedSongsStr) {
        const likedSongs = JSON.parse(likedSongsStr);
        const song = likedSongs.find((s: any) => s.id === songId);
        if (song && song.downloadLink) {
          return song.downloadLink;
        }
      }

      // Check in user playlists
      const playlistsStr = await AsyncStorage.getItem("userPlaylists");
      if (playlistsStr) {
        const playlists = JSON.parse(playlistsStr);
        for (const playlist of playlists) {
          const song = playlist.songs.find((s: any) => s.id === songId);
          if (song && song.downloadLink) {
            return song.downloadLink;
          }
        }
      }

      return null;
    } catch (error) {
      console.error("Error checking existing download link:", error);
      return null;
    }
  };

  const saveLikedSongs = async (songs: any[]) => {
    try {
      await AsyncStorage.setItem("likedSongs", JSON.stringify(songs));
    } catch (error) {
      console.error("Error saving liked songs:", error);
    }
  };

  const handleLikePress = async () => {
    const currentSong = {
      id,
      thumbnails,
      name,
      artistName,
      albumName,
      downloadLink,
      likedAt: new Date().toISOString(),
    };

    let updatedLikedSongs;

    if (isLiked) {
      updatedLikedSongs = likedSongs.filter((song) => song.id !== id);
      Alert.alert("Removed", `"${name}" removed from liked songs`);
    } else {
      updatedLikedSongs = [...likedSongs, currentSong];
      Alert.alert("Added", `"${name}" added to liked songs`);
    }

    setLikedSongs(updatedLikedSongs);
    await saveLikedSongs(updatedLikedSongs);
    setIsLiked(!isLiked);
    
    // Reload all songs after updating liked songs
    await loadAllSongs();
  };

  const addToRecentSongs = async (link: string) => {
    try {
      const currentSong = {
        id,
        thumbnails,
        name,
        artistName,
        albumName,
        downloadLink: link,
        playedAt: new Date().toISOString(),
      };
      const stored = await AsyncStorage.getItem("recentSongs");
      let arr = stored ? JSON.parse(stored) : [];
      arr = arr.filter((song: any) => song.id !== id);
      arr.unshift(currentSong);
      if (arr.length > 50) arr = arr.slice(0, 50);
      await AsyncStorage.setItem("recentSongs", JSON.stringify(arr));
    } catch (e) {
      console.error("Error saving recent song:", e);
    }
  };

  // --- Audio controls with fast loading ---
  const loadAndPlayImmediately = async (link: string) => {
    try {
      setIsLoading(true);
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      
      // Set audio mode for better performance
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
      });

      const { sound } = await Audio.Sound.createAsync(
        { uri: link },
        { shouldPlay: true, progressUpdateIntervalMillis: 500 },
        onPlaybackStatusUpdate
      );
      
      soundRef.current = sound;
      setIsPlaying(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading audio:", error);
      setIsLoading(false);
      Alert.alert("Error", "Failed to load audio");
    }
  };

  const loadAndPlay = async () => {
    if (!downloadLink) return;
    await loadAndPlayImmediately(downloadLink);
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis || 0);
      setPosition(status.positionMillis || 0);
      setProgress(
        status.durationMillis ? status.positionMillis / status.durationMillis : 0
      );
      setIsPlaying(status.isPlaying);
      
      if (status.didJustFinish) {
        setIsPlaying(false);
      }
    }
  };

  const togglePlayPause = async () => {
    if (isLoading) return;

    if (!soundRef.current) {
      await loadAndPlay();
      return;
    }
    
    try {
      const status = await soundRef.current.getStatusAsync();
      if (status.isLoaded && status.isPlaying) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error toggling play/pause:", error);
    }
  };

  const handleSeek = async (value: number) => {
    if (soundRef.current && duration) {
      const seekPosition = value * duration;
      await soundRef.current.setPositionAsync(seekPosition);
    }
  };

  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSkipForward = async () => {
    if (allSongs.length === 0) {
      Alert.alert("No Songs", "No songs available to skip to");
      return;
    }

    // Stop current audio before navigating
    if (soundRef.current) {
      try {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
        setIsPlaying(false);
      } catch (error) {
        console.error("Error stopping audio:", error);
      }
    }

    const nextIndex = (currentIndex + 1) % allSongs.length;
    const nextSong = allSongs[nextIndex];
    
    if (nextSong && nextSong.downloadLink) {
      // Navigate to next song - adjust pathname based on your routing
      router.push({
        pathname: "/player/[id]",
        params: {
          id: nextSong.id,
          thumbnails: nextSong.thumbnails,
          name: nextSong.name,
          artistName: nextSong.artistName,
          albumName: nextSong.albumName,
        },
      });
    }
  };

  const handleSkipBackward = async () => {
    if (allSongs.length === 0) {
      Alert.alert("No Songs", "No songs available to skip to");
      return;
    }

    // Stop current audio before navigating
    if (soundRef.current) {
      try {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
        setIsPlaying(false);
      } catch (error) {
        console.error("Error stopping audio:", error);
      }
    }

    const prevIndex = currentIndex - 1 < 0 ? allSongs.length - 1 : currentIndex - 1;
    const prevSong = allSongs[prevIndex];
    
    if (prevSong && prevSong.downloadLink) {
      // Navigate to previous song - adjust pathname based on your routing
      router.push({
        pathname: "/player/[id]",
        params: {
          id: prevSong.id,
          thumbnails: prevSong.thumbnails,
          name: prevSong.name,
          artistName: prevSong.artistName,
          albumName: prevSong.albumName,
        },
      });
    }
  };

  const handlePlaylistItemPress = (song: any) => {
    setShowPlaylist(false);
    // Navigate to the selected song
    console.log("Playing song:", song.name);
  };

  const handleAddToPlaylist = () => {
    setShowAddToPlaylist(true);
  };

  const renderPlaylistItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.playlistItem, item.id === id && styles.activePlaylistItem]}
      onPress={() => handlePlaylistItemPress(item)}
    >
      <Image source={{ uri: item.thumbnails }} style={styles.playlistThumbnail} />
      <View style={styles.playlistInfo}>
        <Text style={styles.playlistSongName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.playlistArtistName} numberOfLines={1}>
          {item.artistName}
        </Text>
      </View>
      {item.id === id && (
        <MaterialCommunityIcons name="equalizer" size={20} color="#D7FD50" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.bgWrapper}>
        <ImageBackground
          source={{ uri: thumbnails }}
          style={styles.backgroundImage}
          blurRadius={30}
        >
          <View style={styles.overlay} />
          <View style={styles.content}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.headerBtn}>
                <Link href="/(tabs)">
                  <Ionicons name="chevron-back" size={28} color="#fff" />
                </Link>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Now Playing</Text>
              <TouchableOpacity
                style={styles.headerBtn}
                onPress={handleLikePress}
              >
                <Feather
                  name="heart"
                  size={28}
                  color={isLiked ? "#D7FD50" : "#fff"}
                  fill={isLiked ? "#D7FD50" : "none"}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.albumWrap}>
              <Image source={{ uri: thumbnails }} style={styles.album} />
            </View>
            <Text style={styles.song}>{name}</Text>
            <Text style={styles.artist}>{artistName}</Text>
            <View style={styles.sliderContainer}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                value={progress}
                minimumTrackTintColor="#D7FD50"
                maximumTrackTintColor="rgba(255,255,255,0.3)"
                thumbTintColor="#D7FD50"
                onSlidingComplete={handleSeek}
              />
              <View style={styles.timeRow}>
                <Text style={styles.time}>{formatTime(position)}</Text>
                <Text style={styles.time}>
                  -{formatTime(duration - position)}
                </Text>
              </View>
            </View>
            <View style={styles.controlsRow}>
              <TouchableOpacity style={styles.controlBtn}>
                <MaterialCommunityIcons name="shuffle" size={26} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.controlBtn}
                onPress={handleSkipBackward}
                disabled={allSongs.length === 0}
              >
                <Feather name="skip-back" size={32} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.playBtn}
                onPress={togglePlayPause}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="large" color="#000" />
                ) : (
                  <Feather
                    name={isPlaying ? "pause" : "play"}
                    size={34}
                    color="#000"
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.controlBtn}
                onPress={handleSkipForward}
                disabled={allSongs.length === 0}
              >
                <Feather name="skip-forward" size={32} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.controlBtn}
                onPress={handleAddToPlaylist}
              >
                <MaterialCommunityIcons name="playlist-plus" size={28} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>

      {/* Current Playlist Modal */}
      <Modal
        visible={showPlaylist}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPlaylist(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Current Playlist</Text>
              <TouchableOpacity onPress={() => setShowPlaylist(false)}>
                <Ionicons name="close" size={28} color="#fff" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={playlist}
              renderItem={renderPlaylistItem}
              keyExtractor={(item) => item.id}
              style={styles.playlistList}
              contentContainerStyle={styles.playlistContent}
              ListEmptyComponent={
                <Text style={styles.emptyPlaylist}>No songs in playlist</Text>
              }
            />
          </View>
        </View>
      </Modal>

      {/* Add to Playlist Modal */}
      <AddToPlaylistModal
        visible={showAddToPlaylist}
        onClose={() => setShowAddToPlaylist(false)}
        currentSong={{
          id,
          thumbnails,
          name,
          artistName,
          albumName,
          downloadLink,
        }}
      />
    </View>
  );
}

// Separate Component for Add to Playlist Modal
function AddToPlaylistModal({
  visible,
  onClose,
  currentSong,
}: {
  visible: boolean;
  onClose: () => void;
  currentSong: any;
}) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [showCreateNew, setShowCreateNew] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  useEffect(() => {
    if (visible) {
      loadPlaylists();
    }
  }, [visible]);

  const loadPlaylists = async () => {
    try {
      const stored = await AsyncStorage.getItem("userPlaylists");
      if (stored) {
        setPlaylists(JSON.parse(stored));
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

  const createNewPlaylist = async () => {
    if (!newPlaylistName.trim()) {
      Alert.alert("Error", "Please enter a playlist name");
      return;
    }

    const songWithDownloadLink = {
      id: currentSong.id,
      thumbnails: currentSong.thumbnails,
      name: currentSong.name,
      artistName: currentSong.artistName,
      albumName: currentSong.albumName,
      downloadLink: currentSong.downloadLink,
    };

    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name: newPlaylistName.trim(),
      songs: [songWithDownloadLink],
      createdAt: new Date().toISOString(),
      thumbnail: currentSong.thumbnails,
    };

    const updatedPlaylists = [...playlists, newPlaylist];
    await savePlaylists(updatedPlaylists);
    
    Alert.alert("Success", `Playlist "${newPlaylistName}" created and song added!`);
    setNewPlaylistName("");
    setShowCreateNew(false);
    onClose();
  };

  const addToExistingPlaylist = async (playlist: Playlist) => {
    // Check if song already exists in playlist
    const songExists = playlist.songs.some((song) => song.id === currentSong.id);
    
    if (songExists) {
      Alert.alert("Info", `"${currentSong.name}" is already in "${playlist.name}"`);
      return;
    }

    const songWithDownloadLink = {
      id: currentSong.id,
      thumbnails: currentSong.thumbnails,
      name: currentSong.name,
      artistName: currentSong.artistName,
      albumName: currentSong.albumName,
      downloadLink: currentSong.downloadLink,
    };

    const updatedPlaylist = {
      ...playlist,
      songs: [...playlist.songs, songWithDownloadLink],
      thumbnail: playlist.songs.length === 0 ? currentSong.thumbnails : playlist.thumbnail,
    };

    const updatedPlaylists = playlists.map((p) =>
      p.id === playlist.id ? updatedPlaylist : p
    );

    await savePlaylists(updatedPlaylists);
    Alert.alert("Success", `Added to "${playlist.name}"`);
    onClose();
  };

  const renderPlaylistItem = ({ item }: { item: Playlist }) => (
    <TouchableOpacity
      style={styles.addPlaylistItem}
      onPress={() => addToExistingPlaylist(item)}
    >
      <View style={styles.addPlaylistThumbnailContainer}>
        {item.thumbnail ? (
          <Image source={{ uri: item.thumbnail }} style={styles.addPlaylistThumbnail} />
        ) : (
          <View style={[styles.addPlaylistThumbnail, styles.placeholderThumbnail]}>
            <MaterialCommunityIcons name="music-note" size={24} color="#fff" />
          </View>
        )}
      </View>
      <View style={styles.addPlaylistInfo}>
        <Text style={styles.addPlaylistName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.addPlaylistCount}>
          {item.songs.length} song{item.songs.length !== 1 ? "s" : ""}
        </Text>
      </View>
      <Feather name="plus" size={24} color="#D7FD50" />
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add to Playlist</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
          </View>

          {!showCreateNew ? (
            <>
              <TouchableOpacity
                style={styles.createPlaylistBtn}
                onPress={() => setShowCreateNew(true)}
              >
                <View style={styles.createIconContainer}>
                  <Feather name="plus" size={24} color="#D7FD50" />
                </View>
                <Text style={styles.createPlaylistText}>Create New Playlist</Text>
              </TouchableOpacity>

              <FlatList
                data={playlists}
                renderItem={renderPlaylistItem}
                keyExtractor={(item) => item.id}
                style={styles.playlistList}
                contentContainerStyle={styles.playlistContent}
                ListEmptyComponent={
                  <Text style={styles.emptyPlaylist}>
                    No playlists yet. Create one to get started!
                  </Text>
                }
              />
            </>
          ) : (
            <View style={styles.createNewContainer}>
              <Text style={styles.createNewTitle}>New Playlist</Text>
              <TextInput
                style={styles.playlistInput}
                placeholder="Enter playlist name"
                placeholderTextColor="rgba(255,255,255,0.4)"
                value={newPlaylistName}
                onChangeText={setNewPlaylistName}
                autoFocus
              />
              <View style={styles.createButtonsRow}>
                <TouchableOpacity
                  style={[styles.createBtn, styles.cancelBtn]}
                  onPress={() => {
                    setShowCreateNew(false);
                    setNewPlaylistName("");
                  }}
                >
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.createBtn, styles.confirmBtn]}
                  onPress={createNewPlaylist}
                >
                  <Text style={styles.confirmBtnText}>Create</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%" },
  bgWrapper: { flex: 1, overflow: "hidden" },
  backgroundImage: { flex: 1, width: "100%", height: "100%" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.6)" },
  content: { flex: 1, paddingTop: 46, paddingHorizontal: 20 },
  header: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between", marginBottom: 32,
  },
  headerBtn: {
    display: "flex", alignItems: "center", justifyContent: "center",
    width: 50, height: 50, borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "600" },
  albumWrap: {
    alignSelf: "center", marginVertical: 20, marginBottom: 30,
    shadowColor: "#000", shadowOpacity: 0.5, shadowRadius: 30,
    shadowOffset: { width: 0, height: 10 }, borderRadius: 140,
  },
  album: { width: 280, height: 280, borderRadius: 140 },
  song: {
    textAlign: "center", fontWeight: "700", fontSize: 26,
    color: "#fff", marginTop: 8,
  },
  artist: {
    textAlign: "center", fontSize: 17,
    color: "rgba(255,255,255,0.7)", marginBottom: 24,
  },
  sliderContainer: { marginVertical: 16, marginBottom: 8 },
  slider: { width: "100%", height: 40 },
  timeRow: {
    flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 4,
  },
  time: { color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: "500" },
  controlsRow: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between", marginTop: 20,
    marginHorizontal: 20, paddingBottom: 20,
  },
  controlBtn: { width: 50, height: 50, alignItems: "center", justifyContent: "center" },
  playBtn: {
    backgroundColor: "#D7FD50", width: 70, height: 70, borderRadius: 35,
    alignItems: "center", justifyContent: "center",
    shadowColor: "#D7FD50", shadowOpacity: 0.4,
    shadowRadius: 15, shadowOffset: { width: 0, height: 5 },
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#1a1a1a",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
    paddingTop: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  modalTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  playlistList: {
    flex: 1,
  },
  playlistContent: {
    paddingVertical: 10,
  },
  playlistItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "transparent",
  },
  activePlaylistItem: {
    backgroundColor: "rgba(215,253,80,0.1)",
  },
  playlistThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  playlistInfo: {
    flex: 1,
    marginRight: 12,
  },
  playlistSongName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  playlistArtistName: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
  },
  emptyPlaylist: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
    paddingHorizontal: 40,
  },
  createPlaylistBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
    marginBottom: 10,
  },
  createIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "rgba(215,253,80,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  createPlaylistText: {
    color: "#D7FD50",
    fontSize: 16,
    fontWeight: "600",
  },
  addPlaylistItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  addPlaylistThumbnailContainer: {
    marginRight: 12,
  },
  addPlaylistThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  placeholderThumbnail: {
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  addPlaylistInfo: {
    flex: 1,
    marginRight: 12,
  },
  addPlaylistName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  addPlaylistCount: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 13,
  },
  createNewContainer: {
    padding: 20,
  },
  createNewTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  playlistInput: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 16,
    color: "#fff",
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  createButtonsRow: {
    flexDirection: "row",
    gap: 12,
  },
  createBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelBtn: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  confirmBtn: {
    backgroundColor: "#D7FD50",
  },
  cancelBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  confirmBtnText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
});