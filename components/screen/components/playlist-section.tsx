import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Ionicons } from "@expo/vector-icons";
import { SplashScreen } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export function PlaylistSection({ data }: { data: any }) {  // Typed prop for clarity
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const scrollRef = useRef<ScrollView>(null);  // Typed ref
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  // Early return if no data
  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No playlists available</Text>
      </View>
    );
  }

  const scrollLeft = () => {
    const newX = Math.max(0, scrollX - 220);
    scrollRef.current?.scrollTo({ x: newX, animated: true });
    setScrollX(newX);  // Update state for consistency
  };

  const scrollRight = () => {
    const newX = scrollX + 220;
    scrollRef.current?.scrollTo({ x: newX, animated: true });
    setScrollX(newX);  // Update state
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Text style={styles.subHeader}>Music that's hot and happening!</Text>
          <Text style={styles.headerText}>{data.playlisttitle}</Text>
        </View>
        <TouchableOpacity onPress={scrollLeft} style={styles.arrowButton}>
          <Ionicons name="arrow-back" size={24} color="#b3b3b3" />
        </TouchableOpacity>
        <TouchableOpacity onPress={scrollRight} style={styles.arrowButton}>
          <Ionicons name="arrow-forward" size={24} color="#b3b3b3" />
        </TouchableOpacity>
      </View>
      <ScrollView
        ref={scrollRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => setScrollX(e.nativeEvent.contentOffset.x)}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollRow}
      >
        {data.items.map((pl: { playlistID: any; thumbnail: any; playlisttitle: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; playlistsubtitle: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, idx: any) => (
          <TouchableOpacity
            style={[styles.itemCard, { width: 200 }]}
            key={pl.playlistID || idx}  // Fallback key if ID missing
          >
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: pl.thumbnail }}
                style={[styles.playlistImage, { height: 160 }]}
                defaultSource={{ uri: 'placeholder-image-url' }}  // Optional: for loading states
              />
              <View style={styles.playOverlay}>
                <Ionicons name="play" size={25} color="#fff" />
              </View>
            </View>
            <View style={styles.textCol}>
              <Text style={styles.playlistTitle} numberOfLines={1}>
                {pl.playlisttitle}
              </Text>
              <Text style={styles.metaArtists} numberOfLines={1}>
                {pl.playlistsubtitle}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 12,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  arrowButton: {
    padding: 8,
  },
  headerLeft: {
    flex: 1,
    marginHorizontal: 16,
  },
  subHeader: {
    fontSize: 14,
    color: "#FFD700",
    fontFamily: "Inter_400Regular",
    marginBottom: 4,
  },
  headerText: {
    fontSize: 24,
    color: "#ffffff",
    fontFamily: "Inter_700Bold",
  },
  scrollRow: {
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "flex-start",
  },
  itemCard: {
    backgroundColor: "#1E1E23",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.1)",
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    position: "relative",
  },
  playlistImage: {
    width: "100%",
    backgroundColor: "#1a1a1a",
  },
  playOverlay: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  textCol: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flex: 1,
  },
  playlistTitle: {
    color: "#ffffff",
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    lineHeight: 22,
    marginBottom: 4,
  },
  metaArtists: {
    color: "#b3b3b3",
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 18,
  },
  noDataText: {  // New style for empty state
    color: "#b3b3b3",
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    textAlign: "center",
    padding: 20,
  },
});