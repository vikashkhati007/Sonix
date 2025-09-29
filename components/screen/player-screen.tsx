import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Slider } from 'react-native-elements';

export default function PlayerScreen({ id, thumbnails, name, artistName, albumName }: { id: string, thumbnails: string, name: string, artistName: string, albumName: string }) {
  const [progress, setProgress] = useState(0.28);
  const [isLiked, setIsLiked] = useState(false);
  const [likedSongs, setLikedSongs] = useState([]);

  // Load liked songs on component mount
  useEffect(() => {
    loadLikedSongs();
  }, []);

  // Save to recent songs on song change (when id changes!)
  useEffect(() => {
    addToRecentSongs();
  }, [id]);

  // Check if current song is liked
  useEffect(() => {
    const songIsLiked = likedSongs.some(song => song.id === id);
    setIsLiked(songIsLiked);
  }, [likedSongs, id]);

  const loadLikedSongs = async () => {
    try {
      const storedLikedSongs = await AsyncStorage.getItem('likedSongs');
      if (storedLikedSongs) {
        setLikedSongs(JSON.parse(storedLikedSongs));
      }
    } catch (error) {
      console.error('Error loading liked songs:', error);
    }
  };

  const saveLikedSongs = async (songs) => {
    try {
      await AsyncStorage.setItem('likedSongs', JSON.stringify(songs));
    } catch (error) {
      console.error('Error saving liked songs:', error);
    }
  };

  const handleLikePress = async () => {
    const currentSong = {
      id,
      thumbnails,
      name,
      artistName,
      albumName,
      likedAt: new Date().toISOString()
    };

    let updatedLikedSongs;

    if (isLiked) {
      // Remove from liked songs
      updatedLikedSongs = likedSongs.filter(song => song.id !== id);
      Alert.alert('Removed from Liked Songs', `"${name}" has been removed from your liked songs.`);
    } else {
      // Add to liked songs
      updatedLikedSongs = [...likedSongs, currentSong];
      Alert.alert('Added to Liked Songs', `"${name}" has been added to your liked songs.`);
    }

    setLikedSongs(updatedLikedSongs);
    await saveLikedSongs(updatedLikedSongs);
    setIsLiked(!isLiked);
  };

  // --- THIS IS NEW: Save song to the recents list in AsyncStorage ---
  const addToRecentSongs = async () => {
    try {
      const currentSong = {
        id,
        thumbnails,
        name,
        artistName,
        albumName,
        playedAt: new Date().toISOString(),
      };
      const stored = await AsyncStorage.getItem('recentSongs');
      let arr = stored ? JSON.parse(stored) : [];
      // Remove duplicate if exists
      arr = arr.filter(song => song.id !== id);
      // Add to front
      arr.unshift(currentSong);
      // Optionally limit history size (e.g., last 50 recent songs)
      if(arr.length > 50) arr = arr.slice(0, 50);
      await AsyncStorage.setItem('recentSongs', JSON.stringify(arr));
    } catch (e) {
      console.error('Error saving recent song:', e);
    }
  };
  // ---------------------------------------------------------------

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
              <TouchableOpacity style={styles.headerBtn} onPress={handleLikePress}>
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
            <View style={styles.lyricContainer}>
              <Text style={styles.lyricInactive}>Whispers in the midnight breeze,</Text>
              <Text style={styles.lyricActive}>Carrying dreams across the seas,</Text>
              <Text style={styles.lyricInactive}>I close my eyes, let go, and drift away.</Text>
            </View>
            <View style={styles.sliderContainer}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                value={progress}
                minimumTrackTintColor="#D7FD50"
                maximumTrackTintColor="rgba(255,255,255,0.3)"
                thumbTintColor="#D7FD50"
                onValueChange={setProgress}
              />
              <View style={styles.timeRow}>
                <Text style={styles.time}>0:28</Text>
                <Text style={styles.time}>-2:15</Text>
              </View>
            </View>
            <View style={styles.controlsRow}>
              <TouchableOpacity style={styles.controlBtn}>
                <MaterialCommunityIcons name="shuffle" size={26} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlBtn}>
                <Feather name="skip-back" size={32} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.playBtn}>
                <Feather name="pause" size={34} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlBtn}>
                <Feather name="skip-forward" size={32} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlBtn}>
                <Feather name="music" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.homeIndicator} />
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  bgWrapper: {
    flex: 1,
    overflow: 'hidden',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    flex: 1,
    paddingTop: 46,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  headerBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  albumWrap: {
    backgroundColor: "blue",
    alignSelf: 'center',
    marginVertical: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 10 },
    borderRadius: 140,
  },
  album: {
    width: 280,
    height: 280,
    borderRadius: 140,
  },
  song: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 26,
    color: '#fff',
    marginTop: 8,
  },
  artist: {
    textAlign: 'center',
    fontSize: 17,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 24,
  },
  lyricContainer: {
    alignItems: 'center',
    marginBottom: 20,
    minHeight: 70,
  },
  lyricActive: {
    fontSize: 19,
    color: '#fff',
    fontWeight: '700',
    marginVertical: 2,
    textAlign: 'center',
  },
  lyricInactive: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.4)',
    marginVertical: 2,
    textAlign: 'center',
  },
  sliderContainer: {
    marginVertical: 16,
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  time: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    fontWeight: '500',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 20,
    paddingBottom: 20,
  },
  controlBtn: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtn: {
    backgroundColor: '#D7FD50',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#D7FD50',
    shadowOpacity: 0.4,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
  },
  homeIndicator: {
    height: 5,
    width: 134,
    borderRadius: 3,
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginBottom: 8,
    marginTop: 4,
    opacity: 0.3,
  },  
});
