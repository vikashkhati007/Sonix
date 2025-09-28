import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const categories = ['All', 'New Release', 'Trending', 'Top', 'Popular', 'Recommended'];

export default function CategoryTabs() {
  const [selected, setSelected] = useState('All');

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
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
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

