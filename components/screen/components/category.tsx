import { id } from '@/constants/playlist';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PlaylistSection } from './playlist-section';

const categories = ['All', 'Chill' , 'Romance', 'Workout', 'Sleep', 'Focus'];

export default function CategoryTabs() {
  const [selected, setSelected] = useState('All');
  const [playlists, setPlaylists] = useState([]);

  useEffect(()=>{
    const fetchPlaylists = async (query: string) => {
      try {
        const response = await fetch(`/playlist?token=${query}`);
        if (!response.ok) throw new Error("Fetch failed");
        const data = await response.json();
        const filteredItemsPlaylists = (data.response || []).map((playlist: any) => ({
          ...playlist,
          items: playlist.items.filter((item:any) => item.playlistID.startsWith("V")),
        })).filter((playlist:any) => playlist.items.length > 0);
        setPlaylists(filteredItemsPlaylists);
        console.log(filteredItemsPlaylists);
      } catch (error) {
        console.error("Error fetching playlists:", error);
        setPlaylists([]);
      }
    };
    switch(selected){
      case 'All':
        setPlaylists([]);
        fetchPlaylists(id.All);
        break;
      case 'Chill':
        setPlaylists([]);
        fetchPlaylists(id.Chill);
        break;
      case 'Romance':
        setPlaylists([]);
        fetchPlaylists(id.Romance);
        break;
      case 'Workout':
        setPlaylists([]);
        fetchPlaylists(id.Workout);
        break;
      case 'Sleep':
        setPlaylists([]);
        fetchPlaylists(id.Sleep);
        break;
      case 'Focus':
        setPlaylists([]);
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
      {playlists.map((playlist, idx) => (
        <PlaylistSection key={idx} data={playlist} />
      ))}
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
});

