import MainSection from '@/components/hero-mainsection';
import Header from '@/components/screen/components/header-section';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { PlaylistSection } from './components/playlist-section';

const HomePage = () => {  // Removed 'async' – components can't be async
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch('/playlist');
        if (!response.ok) throw new Error('Fetch failed');
        const data = await response.json();  // Renamed to avoid shadowing
        setPlaylists(data.response);  // Fallback to empty array
      } catch (error) {
        console.error('Error fetching playlists:', error);
        setPlaylists([]);  // Graceful fallback
      }
    };
    fetchPlaylists();
  }, []);
  return (
    <View style={styles.container}>
      <Header />
      <MainSection />
      {playlists.map((pl, idx) => (
        <PlaylistSection key={(pl as any).playlisttitle} data={pl} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    gap: 25,
  },
});

export default HomePage;