import MainSection from '@/components/hero-mainsection';
import Header from '@/components/screen/components/header-section';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { PlaylistSection } from './components/playlist-section';



const hotPlaylists = [
  {
    name: "Uncut Bollywood",
    artists: "Arijit Singh, Pritam, Shreya Ghoshal, Rochak...",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=300&h=300&fit=crop",
  },
  {
    name: "Punjab Fire",
    artists: "Karan Aujla, Ikky, Shubh, AP Dhillon",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
  },
  {
    name: "Bollywood Hits",
    artists: "Tanishk Bagchi, Bhattacharya, Yo Yo Honey Singh",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535a?w=300&h=300&fit=crop",
  },
];

const topTracksPlaylists = [
  {
    name: "Desire",
    artists: "Arijit Singh, Pritam, Shreya Ghoshal...",
    image:
      "https://images.unsplash.com/photo-1468364151020-9ec07d9b8a4f?w=300&h=300&fit=crop",
  },
  {
    name: "Punjab Fire",
    artists: "Karan Aujla, Ikky, Shubh, AP Dhillon",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
  },
  {
    name: "Bollywood Vibes",
    artists: "Tanishk Bagchi, Yo Yo Honey Singh",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=300&h=300&fit=crop",
  },
];

const biggestHitsPlaylists = [
  {
    name: "Danger",
    artists: "Arijit Singh, Poojah, Pritam...",
    image:
      "https://images.unsplash.com/photo-1468364151020-9ec07d9b8a4f?w=300&h=300&fit=crop",
  },
  {
    name: "Punjab Fire",
    artists: "Karan Aujla, Ikky, Shubh...",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
  },
  {
    name: "Bollywood Hits",
    artists: "Tamannaah, Dheerksh, Galet...",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535a?w=300&h=300&fit=crop",
  },
];

const HomePage = async () => {
  const [playlists, setPlaylists] = useState([]);
  useEffect(()=>{
    const fetchPlaylists = async () => {
      const response = await fetch('/playlist');
      const playlists = await response.json();
      console.log(playlists.response[0]);
      setPlaylists(playlists.response);
    }
    fetchPlaylists();
  },[])
  return (
    <View style={styles.container}>
      <Header />
      <MainSection />
       <PlaylistSection
      playlists={playlists}
      subHeader="Music that's hot and happening!"
      header="India's biggest hits"
      cardWidth={220}
      imageHeight={180}
    />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    gap: 25
  }
})


export default HomePage