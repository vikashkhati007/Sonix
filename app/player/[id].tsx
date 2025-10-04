import PlayerScreen from "@/components/screen/player-screen";
import { Inter_400Regular, useFonts } from "@expo-google-fonts/inter";
import { SplashScreen, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

type Song = {
  id: string;
  thumbnails: string;
  name: string;
  artistName: string;
  albumName: string;
  downloadLink?: string;
};

const music = () => {
  const { id, thumbnails, name, artistName, albumName, playlistId, songs: songsStr, currentIndex } =
    useLocalSearchParams();
  const [loaded, error] = useFonts({
    Inter_400Regular,
  });

  const songs: Song[] = songsStr ? JSON.parse(songsStr as string) : [];
  const index = parseInt(currentIndex as string || '0', 10);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <View style={styles.container}>
      <PlayerScreen
        id={String(id)}
        thumbnails={String(thumbnails)}
        name={String(name)}
        artistName={String(artistName)}
        albumName={String(albumName)}
        playlistId={String(playlistId)}
        songs={songs}
        currentIndex={index}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "Inter_400Regular",
  },
});

export default music;