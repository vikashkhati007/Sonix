import { Inter_400Regular, useFonts } from '@expo-google-fonts/inter';
import { Feather, Ionicons } from '@expo/vector-icons';
import { SplashScreen } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const trendingData = [
  {
    title: 'Discover weekly',
    subtitle: 'The original slow instrumental best playlists.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
  },
  {
    title: 'Lo-fi beats',
    subtitle: 'Relaxing electronic smooth playlists.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  },
  {
    title: 'Coding focus',
    subtitle: 'No distraction, pure productive energy.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
  },
  // Add more items...
];

function TrendingCard({ title, subtitle, image }: { title: string, subtitle: string, image: string }) {
    const [loaded, error] = useFonts({
    Inter_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        {/* Left: Text/Icons */}
        <View style={{ flex: 1, minWidth: 160 }}>
          <Text style={styles.mainTitle}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <View style={styles.iconRow}>
            <TouchableOpacity>
              <View style={styles.iconCircle}>
                <Ionicons name="play" size={25} color="#fff" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="heart" size={22} color="#232435" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="download" size={22} color="#232435" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="more-horizontal" size={22} color="#232435" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        {/* Right: Image */}
        <Image source={{ uri: image }} style={styles.cardImage} />
      </View>
    </View>
  );
}

export default function TrendingSection() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionHeaderText}>Curated & trending</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollWrapper}>
        {trendingData.map((item, idx) => (
          <TrendingCard key={idx} {...item} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20
  },
  sectionHeaderText: {
    color: '#fff',
    fontSize: 23,
    marginTop: 14,
    fontFamily: "Inter_400Regular",
    paddingLeft: 12,
  },
  scrollWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  },
  cardContainer: {
    backgroundColor: '#ba8fff', // Main accent
    borderRadius: 28,
    marginRight: 14,
    padding: 18,
    height: 200,
    width: 320,
    shadowColor: "#000",
    shadowOpacity: 0.09,
    shadowRadius: 10,
    elevation: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#232435',
    marginBottom: 8,
    
  },
  subtitle: {
    color: '#232435',
    fontSize: 15,
    marginBottom: 22,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    backgroundColor: '#37074a',
    borderRadius: 34,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  icon: {
    marginHorizontal: 2,
  },
  cardImage: {
    width: 80,
    height: 120,
    borderRadius: 18,
    marginLeft: 14,
    objectFit: 'cover',
    resizeMode: 'cover',
  },
});

