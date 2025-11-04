import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { CommonStyles } from '../constants/Styles';

export default function About() {
  return (
    <ScrollView style={CommonStyles.container}>
      <View style={styles.content}>
        <Text style={CommonStyles.sectionTitle}>About Us</Text>
        <Text style={styles.text}>
          Welcome to AfriRental, your premier destination for real estate solutions across Africa.
          We specialize in connecting property seekers with their dream homes and investment opportunities.
        </Text>
        
        <Text style={styles.subtitle}>Our Mission</Text>
        <Text style={styles.text}>
          To revolutionize the African real estate market by providing transparent, 
          efficient, and accessible property solutions for everyone.
        </Text>
        
        <Text style={styles.subtitle}>Why Choose Us</Text>
        <Text style={styles.text}>
          With years of experience and a deep understanding of local markets, 
          we offer unparalleled service and expertise in African real estate.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.primary,
    marginTop: 24,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: Colors.darkGray,
    lineHeight: 24,
    marginBottom: 16,
  },
});