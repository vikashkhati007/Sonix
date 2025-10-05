import { id } from '@/constants/playlist';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PlaylistSection } from './playlist-section';

const categories = ['All', 'Chill' , 'Romance', 'Workout', 'Sleep', 'Focus'];

export default function CategoryTabs() {
  const [selected, setSelected] = useState('All');
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPlaylists = async (query: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/playlist?token=${query}`);
      if (!response.ok) throw new Error("Fetch failed");
      const data = await response.json();
      const filteredItemsPlaylists = (data.response || []).map((playlist: any) => ({
        ...playlist,
        items: playlist.items.filter((item:any) => item.playlistID.startsWith("V")),
      })).filter((playlist:any) => playlist.items.length > 0);
      setPlaylists(filteredItemsPlaylists);
    } catch (error) {
      console.error("Error fetching playlists:", error);
      setPlaylists([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    switch(selected){
      case 'All':
        fetchPlaylists(id.All);
        fetchPlaylists(id.Chill);
        break;
      case 'Chill':
        fetchPlaylists(id.Chill);
        break;
      case 'Romance':
        fetchPlaylists(id.Romance);
        break;
      case 'Workout':
        fetchPlaylists(id.Workout);
        break;
      case 'Sleep':
        fetchPlaylists(id.Sleep);
        break;
      case 'Focus':
        fetchPlaylists(id.Focus);
        break;
    }
  },[selected])

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.tab,
              selected === cat ? styles.activeTab : styles.inactiveTab
            ]}
            onPress={() => setSelected(cat)}
            disabled={loading}
          >
            <Text style={[
              styles.tabText,
              selected === cat ? styles.activeText : styles.inactiveText
            ]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.playlistsContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#d7fd50" />
            <Text style={styles.loadingText}>Loading {selected} playlists...</Text>
          </View>
        ) : playlists.length > 0 ? (
          playlists.map((playlist, idx) => (
            <PlaylistSection key={idx} data={playlist} />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No playlists available for {selected}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    display: 'flex',
    gap: 20
  },
  playlistsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    display: 'flex',
    gap: 20
  },
  tabsContainer: {
    flexDirection: 'row', // Only here.
    gap: 8,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#d7fd50',
  },
  inactiveTab: {
    backgroundColor: '#232435',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  activeText: {
    color: '#232435',
  },
  inactiveText: {
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});