import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

export default function BottomNavigation({ activeTab, onTabPress }: BottomNavigationProps) {
  const tabs = [
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'about', title: 'About', icon: 'information-circle' },
    { key: 'contact', title: 'Contact', icon: 'call' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={styles.tab}
          onPress={() => onTabPress(tab.key)}
        >
          <Ionicons
            name={tab.icon as any}
            size={24}
            color={activeTab === tab.key ? Colors.primary : Colors.gray}
          />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === tab.key ? Colors.primary : Colors.gray }
            ]}
          >
            {tab.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    paddingVertical: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
  },
});