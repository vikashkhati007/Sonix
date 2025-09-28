import { ThemedText } from '@/components/themed-text';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const musicData = [
  // Replace with dynamic data if available
  {
    title: 'Starlit Reverie',
    author: 'Budiarti',
    count: '8 Songs',
    img: 'https://link-to-img1.jpg'
  },
  {
    title: 'Midnight Confessions',
    author: 'Alexiao',
    count: '24 Songs',
    img: 'https://link-to-img2.jpg'
  },
  // ...add more items as needed
];

const MusicSearchScreen = () => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
         <TouchableOpacity style={styles.headerBtn}>
            <Link href="/(tabs)"><Ionicons name="chevron-back" size={28} color="#fff" /></Link>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Music</Text>
         <TouchableOpacity style={styles.headerBtn}>
            <ThemedText style={styles.moreText}>•••</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search music"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.searchBtn}>
          <FontAwesome6 name="magnifying-glass" size={20} color="#18181B" onPress={() => console.log('Search pressed')} />
        </TouchableOpacity>
      </View>

      {/* Filters Row */}
      <View style={styles.filtersRow}>
        {['All', 'Playlists', 'Liked Songs', 'Downloaded'].map((category, idx) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterBtn,
              activeFilter === category && styles.activeFilter
            ]}
            onPress={() => setActiveFilter(category)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === category && styles.activeFilterText
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Music List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {musicData.map((item, idx) => (
          <TouchableOpacity style={styles.musicItem} key={idx}>
            <Image
              source={{ uri: item.img }}
              style={styles.musicImg}
            />
            <View style={styles.musicInfo}>
              <Text style={styles.musicTitle}>{item.title}</Text>
              <Text style={styles.musicAuthor}>By {item.author} • {item.count}</Text>
            </View>
            <TouchableOpacity style={styles.playBtn}>
              <Text style={styles.playText}>▶</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#18181B', paddingHorizontal: 18, paddingTop: 24 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
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
  headerTitle: { color: '#fff', fontSize: 21, flex: 1, textAlign: 'center' },
  moreBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  moreText: { color: '#fff', fontSize: 18 },

  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#232326', borderRadius: 50, marginBottom: 16, paddingVertical: 4, paddingLeft: 20 },
  searchInput: { flex: 1, color: '#fff', fontSize: 16, paddingVertical: 8 },
  searchBtn: { backgroundColor: '#A7F24E', borderRadius: 50, marginLeft: 8, width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  searchBtnText: { color: '#18181B', fontWeight: 'bold', fontSize: 15 },

  filtersRow: { flexDirection: 'row', marginBottom: 14 },
  filterBtn: { paddingHorizontal: 16, paddingVertical: 9, borderRadius: 16, backgroundColor: '#232326', marginRight: 10 },
  activeFilter: { backgroundColor: '#A7F24E' },
  filterText: { color: '#fff', fontSize: 15 },
  activeFilterText: { color: '#18181B', fontWeight: 'bold' },

  musicItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
  musicImg: { width: 54, height: 54, borderRadius: 16, marginRight: 16, backgroundColor: '#444' },
  musicInfo: { flex: 1 },
  musicTitle: { color: '#fff', fontSize: 17, fontWeight: '500' },
  musicAuthor: { color: '#c7c7c7', fontSize: 13, marginTop: 3 },
  playBtn: { width: 38, height: 38, borderRadius: 12, backgroundColor: '#232326', justifyContent: 'center', alignItems: 'center', marginLeft: 6 },
  playText: { color: '#fff', fontSize: 18 }
});

export default MusicSearchScreen;
