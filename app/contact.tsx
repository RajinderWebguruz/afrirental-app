import React from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { CommonStyles } from '../constants/Styles';

export default function Contact() {
  return (
    <ScrollView style={CommonStyles.container}>
      <View style={styles.content}>
        <Text style={CommonStyles.sectionTitle}>Contact Us</Text>
        
        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            <Ionicons name="call" size={24} color={Colors.primary} />
            <Text style={styles.contactText}>+234 123 456 7890</Text>
          </View>
          
          <View style={styles.contactItem}>
            <Ionicons name="mail" size={24} color={Colors.primary} />
            <Text style={styles.contactText}>info@afrirental.com</Text>
          </View>
          
          <View style={styles.contactItem}>
            <Ionicons name="location" size={24} color={Colors.primary} />
            <Text style={styles.contactText}>Lagos, Nigeria</Text>
          </View>
        </View>
        
        <Text style={styles.formTitle}>Send us a message</Text>
        
        <View style={styles.form}>
          <TextInput
            placeholder="Your Name"
            style={styles.input}
            placeholderTextColor={Colors.gray}
          />
          
          <TextInput
            placeholder="Your Email"
            style={styles.input}
            placeholderTextColor={Colors.gray}
            keyboardType="email-address"
          />
          
          <TextInput
            placeholder="Your Message"
            style={[styles.input, styles.textArea]}
            placeholderTextColor={Colors.gray}
            multiline
            numberOfLines={4}
          />
          
          <TouchableOpacity style={CommonStyles.button}>
            <Text style={CommonStyles.buttonText}>Send Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  contactInfo: {
    marginBottom: 32,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  contactText: {
    fontSize: 16,
    color: Colors.darkGray,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 16,
  },
  form: {
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: Colors.white,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});