import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ExploreCities from "../../components/ExploreCities";
import FeaturedProperties from "../../components/FeaturedProperties";
import HeroSection from "../../components/HeroSection";
import OurServices from "../../components/OurServices";
import TopProperties from "../../components/TopProperties";
import WhatsNew from "../../components/WhatsNew";
import { Colors } from "../../constants/Colors";
import { CommonStyles } from "../../constants/Styles";

export default function Index() {
  return (
    <SafeAreaView style={CommonStyles.container}>
      <ScrollView>
        <HeroSection />
        <FeaturedProperties />
        <ExploreCities />
        <OurServices />
        {/* <OurBenefits /> */}
        <TopProperties />
        <WhatsNew />
      </ScrollView>
    </SafeAreaView>
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
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: Colors.white,
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: "row",
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
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
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 4,
  },
  filterText: {
    color: Colors.white,
    fontWeight: "600",
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  viewAll: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  horizontalList: {
    paddingLeft: 8,
  },
  propertyImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 4,
  },
  propertyDescription: {
    fontSize: 14,
    color: Colors.gray,
  },
  propertyPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 4,
  },
  cityImage: {
    width: "100%",
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  cityName: {
    fontSize: 16,
    fontWeight: "600",
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
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 12,
    color: Colors.gray,
    textAlign: "center",
  },
  teamImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  teamName: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.black,
    textAlign: "center",
  },
  teamRole: {
    fontSize: 12,
    color: Colors.gray,
    textAlign: "center",
  },
  topPropertyImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },

  propertyLocation: {
    fontSize: 12,
    color: Colors.gray,
  },
  blogImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  blogTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 4,
  },
  blogDate: {
    fontSize: 12,
    color: Colors.gray,
  },
});
