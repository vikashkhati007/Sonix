import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Slider } from 'react-native-elements';

export default function PlayerScreen() {
  const [progress, setProgress] = useState(0.28);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn}>
            <Link href="/(tabs)"><Ionicons name="chevron-back" size={28} color="#fff" /></Link>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Now Playing</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <Feather name="heart" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.albumWrap}>
        <Image
          source={{ uri: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" }}
          style={styles.album}
        />
      </View>

      <Text style={styles.song}>Starlit Reverie</Text>
      <Text style={styles.artist}>Budiarti x Lil magrib</Text>
      
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
          maximumTrackTintColor="#fff"
          thumbTintColor="#D7FD50"
          onValueChange={setProgress}
        />
        <View style={styles.timeRow}>
          <Text style={styles.time}>0:28</Text>
          <Text style={styles.time}>-2:15</Text>
        </View>
      </View>

      <View style={styles.controlsRow}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="shuffle" size={26} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="skip-back" size={29} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.playBtn}>
          <Feather name="pause" size={32} color="#181828" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="skip-forward" size={29} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="music" size={23} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Add a home indicator for iOS feel */}
      <View style={styles.homeIndicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1B23',
    paddingTop: 46, // leave space for notch/status
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  headerBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'rgba(128,128,128,0.15)',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 30,
  },
  albumWrap: {
    alignSelf: 'center',
    marginVertical: 6,
    marginBottom: 16,
    shadowColor: '#fff',
    shadowOpacity: 0.09,
    shadowRadius: 16,
  },
  album: {
    width: 240,
    height: 240,
    borderRadius: 120,
  },
  song: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 22,
    color: '#fff',
    marginTop: 8,
  },
  artist: {
    textAlign: 'center',
    fontSize: 16,
    color: '#c5c6ca',
    marginBottom: 18,
  },
  lyricContainer: {
    alignItems: 'center',
    marginBottom: 10,
    minHeight: 60,
  },
  lyricActive: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    marginVertical: 1,
  },
  lyricInactive: {
    fontSize: 15,
    color: '#7c7f87',
    marginVertical: 1,
  },
  sliderContainer: {
    marginVertical: 14,
    marginBottom: 2,
  },
  slider: {
    width: '100%',
    height: 36,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    color: '#aaa',
    fontSize: 13,
    fontWeight: '600',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
    marginHorizontal: 10,
    paddingBottom: 18,
  },
  playBtn: {
    backgroundColor: '#D7FD50',
    width: 58,
    height: 58,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIndicator: {
    height: 6,
    width: 120,
    borderRadius: 3,
    backgroundColor: '#222',
    alignSelf: 'center',
    marginBottom: 6,
    marginTop: 2,
    opacity: 0.24,
  },
});
