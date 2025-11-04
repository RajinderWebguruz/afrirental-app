import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { CommonStyles } from '../constants/Styles';

const properties = [
  { id: '1', title: 'Modern Apartment', description: 'Beautiful 2BR apartment in city center', image: 'https://via.placeholder.com/200x150' },
  { id: '2', title: 'Luxury Villa', description: 'Spacious villa with garden and pool', image: 'https://via.placeholder.com/200x150' },
  { id: '3', title: 'Cozy Studio', description: 'Perfect for young professionals', image: 'https://via.placeholder.com/200x150' },
];

const cities = [
  { id: '1', name: 'Lagos', count: 150, image: 'https://via.placeholder.com/150x100' },
  { id: '2', name: 'Abuja', count: 89, image: 'https://via.placeholder.com/150x100' },
  { id: '3', name: 'Port Harcourt', count: 67, image: 'https://via.placeholder.com/150x100' },
];

const services = [
  { id: '1', title: 'Property Sales', description: 'Buy & sell properties with expert guidance', icon: 'home' },
  { id: '2', title: 'Rental Services', description: 'Find perfect rental properties', icon: 'key' },
  { id: '3', title: 'Property Management', description: 'Complete property management solutions', icon: 'business' },
];

const benefits = [
  { id: '1', title: 'Verified Listings', description: 'All properties are verified and authentic', icon: 'checkmark-circle' },
  { id: '2', title: '24/7 Support', description: 'Round-the-clock customer support', icon: 'headset' },
  { id: '3', title: 'Best Prices', description: 'Competitive pricing guaranteed', icon: 'pricetag' },
];

const team = [
  { id: '1', name: 'John Doe', role: 'CEO & Founder', image: 'https://via.placeholder.com/100x100' },
  { id: '2', name: 'Jane Smith', role: 'Head of Sales', image: 'https://via.placeholder.com/100x100' },
  { id: '3', name: 'Mike Johnson', role: 'Property Manager', image: 'https://via.placeholder.com/100x100' },
];

const topProperties = [
  { id: '1', title: 'Luxury Penthouse', price: '₦50M', location: 'Victoria Island', image: 'https://via.placeholder.com/180x120' },
  { id: '2', title: 'Family House', price: '₦25M', location: 'Lekki', image: 'https://via.placeholder.com/180x120' },
  { id: '3', title: 'Office Space', price: '₦15M', location: 'Ikeja', image: 'https://via.placeholder.com/180x120' },
];

const blogs = [
  { id: '1', title: 'Real Estate Trends 2024', date: 'Jan 15, 2024', image: 'https://via.placeholder.com/180x120' },
  { id: '2', title: 'Investment Tips for Beginners', date: 'Jan 10, 2024', image: 'https://via.placeholder.com/180x120' },
  { id: '3', title: 'Lagos Property Market Update', date: 'Jan 5, 2024', image: 'https://via.placeholder.com/180x120' },
];

export default function Index() {
  const renderProperty = ({ item }: any) => (
    <View style={[CommonStyles.card, { width: 200 }]}>
      <Image source={{ uri: item.image }} style={styles.propertyImage} />
      <Text style={styles.propertyTitle}>{item.title}</Text>
      <Text style={styles.propertyDescription}>{item.description}</Text>
    </View>
  );

  const renderCity = ({ item }: any) => (
    <View style={[CommonStyles.card, { width: 150 }]}>
      <Image source={{ uri: item.image }} style={styles.cityImage} />
      <Text style={styles.cityName}>{item.name}</Text>
      <Text style={styles.cityCount}>{item.count} properties</Text>
    </View>
  );

  const renderService = ({ item }: any) => (
    <View style={[CommonStyles.card, { width: 160 }]}>
      <Ionicons name={item.icon as any} size={32} color={Colors.primary} style={{ marginBottom: 8 }} />
      <Text style={styles.serviceTitle}>{item.title}</Text>
      <Text style={styles.serviceDescription}>{item.description}</Text>
    </View>
  );

  const renderBenefit = ({ item }: any) => (
    <View style={[CommonStyles.card, { width: 160 }]}>
      <Ionicons name={item.icon as any} size={32} color={Colors.secondary} style={{ marginBottom: 8 }} />
      <Text style={styles.serviceTitle}>{item.title}</Text>
      <Text style={styles.serviceDescription}>{item.description}</Text>
    </View>
  );

  const renderTeamMember = ({ item }: any) => (
    <View style={[CommonStyles.card, { width: 140, alignItems: 'center' }]}>
      <Image source={{ uri: item.image }} style={styles.teamImage} />
      <Text style={styles.teamName}>{item.name}</Text>
      <Text style={styles.teamRole}>{item.role}</Text>
    </View>
  );

  const renderTopProperty = ({ item }: any) => (
    <View style={[CommonStyles.card, { width: 180 }]}>
      <Image source={{ uri: item.image }} style={styles.topPropertyImage} />
      <Text style={styles.propertyTitle}>{item.title}</Text>
      <Text style={styles.propertyPrice}>{item.price}</Text>
      <Text style={styles.propertyLocation}>{item.location}</Text>
    </View>
  );

  const renderBlog = ({ item }: any) => (
    <View style={[CommonStyles.card, { width: 180 }]}>
      <Image source={{ uri: item.image }} style={styles.blogImage} />
      <Text style={styles.blogTitle}>{item.title}</Text>
      <Text style={styles.blogDate}>{item.date}</Text>
    </View>
  );

  return (
    <ScrollView style={CommonStyles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Find Your Dream Property</Text>
        <Text style={styles.heroSubtitle}>Discover the best real estate deals in Africa</Text>
        
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={Colors.gray} />
            <TextInput
              placeholder="Search properties..."
              style={styles.searchInput}
              placeholderTextColor={Colors.gray}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>For Rent</Text>
            <Ionicons name="chevron-down" size={16} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Properties Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={CommonStyles.sectionTitle}>Featured Properties</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={properties}
          renderItem={renderProperty}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      </View>

      {/* Explore Cities Section */}
      <View style={styles.section}>
        <Text style={CommonStyles.sectionTitle}>Explore Cities</Text>
        <FlatList
          data={cities}
          renderItem={renderCity}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      </View>

      {/* Our Services */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={CommonStyles.sectionTitle}>Our Services</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={services}
          renderItem={renderService}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      </View>

      {/* Our Benefits */}
      <View style={styles.section}>
        <Text style={CommonStyles.sectionTitle}>Our Benefits</Text>
        <FlatList
          data={benefits}
          renderItem={renderBenefit}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      </View>

      {/* Meet Our Team */}
      <View style={styles.section}>
        <Text style={CommonStyles.sectionTitle}>Meet Our Team</Text>
        <FlatList
          data={team}
          renderItem={renderTeamMember}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      </View>

      {/* Top Properties */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={CommonStyles.sectionTitle}>Top Properties</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={topProperties}
          renderItem={renderTopProperty}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      </View>

      {/* What's New (Blogs) */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={CommonStyles.sectionTitle}>What's New</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={blogs}
          renderItem={renderBlog}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: Colors.primary,
    padding: 24,
    paddingTop: 40,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: Colors.white,
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: Colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 4,
  },
  filterText: {
    color: Colors.white,
    fontWeight: '600',
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAll: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  horizontalList: {
    paddingLeft: 8,
  },
  propertyImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
  },
  propertyDescription: {
    fontSize: 14,
    color: Colors.gray,
  },
  cityImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  cityName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  cityCount: {
    fontSize: 12,
    color: Colors.gray,
  },
  sectionText: {
    fontSize: 16,
    color: Colors.gray,
    lineHeight: 24,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 12,
    color: Colors.gray,
    textAlign: 'center',
  },
  teamImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  teamName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
  },
  teamRole: {
    fontSize: 12,
    color: Colors.gray,
    textAlign: 'center',
  },
  topPropertyImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  propertyPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 2,
  },
  propertyLocation: {
    fontSize: 12,
    color: Colors.gray,
  },
  blogImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  blogTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
  },
  blogDate: {
    fontSize: 12,
    color: Colors.gray,
  },
});
