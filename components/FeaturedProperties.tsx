import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../constants/Colors";
import { CommonStyles } from "../constants/Styles";
import { apiService } from "../services/api";
import PropertyImageCarousel from "./PropertyImageCarousel";

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const data = await apiService.getFeaturedProperties();
      setProperties(data.data?.slice(0, 10) || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: string) => {
    return `$${parseInt(price).toLocaleString()}`;
  };

  const renderProperty = ({ item }: any) => (
    <View
      style={[
        CommonStyles.card,
        { width: 200, paddingVertical: 8, marginVertical: 8 },
      ]}
    >
      <View style={styles.imageContainer}>
        <PropertyImageCarousel
          images={item.property_images}
          style={{ width: 170, height: 120, borderRadius: 8, marginBottom: 8 }}
        />
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => router.push(`/property/${item.slug}`)}
        >
          <Ionicons name="eye" size={16} color={Colors.white} />
        </TouchableOpacity>
      </View>
      <Text style={styles.propertyTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.propertyPrice}>{formatPrice(item.price)}</Text>
      <Text style={styles.propertyDescription} numberOfLines={2}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={CommonStyles.sectionTitle}>Featured Properties</Text>
        <TouchableOpacity onPress={() => router.push("/properties")}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.primary}
          style={{ marginVertical: 20 }}
        />
      ) : (
        <FlatList
          data={properties}
          renderItem={renderProperty}
          keyExtractor={(item: any) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  propertyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 4,
  },
  propertyPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 4,
  },
  propertyDescription: {
    fontSize: 14,
    color: Colors.gray,
  },
  imageContainer: {
    position: "relative",
  },
  viewButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 16,
    padding: 6,
  },
});
