import { Tabs } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useState } from 'react';

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.lightGray,
        },
        headerStyle: {
          backgroundColor: Colors.white,
        },
        headerTintColor: Colors.primary,
        headerRight: () => (
          <TouchableOpacity style={{ marginRight: 16 }}>
            <Ionicons 
              name={isLoggedIn ? "person-circle" : "person-outline"} 
              size={28} 
              color={Colors.primary} 
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color }) => <Ionicons name="information-circle" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contact',
          tabBarIcon: ({ color }) => <Ionicons name="call" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
