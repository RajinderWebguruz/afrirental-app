import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PropertyImageCarousel from "../components/PropertyImageCarousel";
import { Colors } from "../constants/Colors";
import { CommonStyles } from "../constants/Styles";
import { apiService } from "../services/api";

const { width: screenWidth } = Dimensions.get("window");

interface Property {
  id: number;
  title: string;
  description: string;
  price: string;
  rooms: number;
  beds: number;
  baths: number;
  type: string;
  purpose: string;
  city: string;
  state: string;
  address: string;
  slug: string;
  property_images: Array<{ image_src: string; image_title: string }>;
  amenities: Array<{ amenity_name: string }>;
}

export default function Properties() {
  const { type, qry } = useLocalSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState((qry as string) || "");
  const [filterType, setFilterType] = useState((type as string) || "all");
  const [appliedFilters, setAppliedFilters] = useState({
    sortBy: "price",
    sortOrder: "DESC",
    minPrice: "",
    maxPrice: "",
    propertyType: "all",
    city: "",
  });
  const [tempFilters, setTempFilters] = useState({
    sortBy: "price",
    sortOrder: "DESC",
    minPrice: "",
    maxPrice: "",
    propertyType: "all",
    city: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, [filterType, appliedFilters, searchQuery]);

  useEffect(() => {
    // Initialize from URL params on component mount
    if (type && type !== filterType) {
      setFilterType(type as string);
    }
    if (qry && qry !== searchQuery) {
      setSearchQuery(qry as string);
    }
  }, [type, qry]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      let params = `image=true&limit=50&sortBy=${appliedFilters.sortBy}&page=1&sortOrder=${appliedFilters.sortOrder}`;

      if (filterType !== "all") params += `&purpose=${filterType}`;
      if (searchQuery) params += `&search=${encodeURIComponent(searchQuery)}`;
      if (appliedFilters.minPrice)
        params += `&minPrice=${appliedFilters.minPrice}`;
      if (appliedFilters.maxPrice)
        params += `&maxPrice=${appliedFilters.maxPrice}`;
      if (appliedFilters.propertyType !== "all")
        params += `&type=${appliedFilters.propertyType}`;
      if (appliedFilters.city) params += `&city=${appliedFilters.city}`;

      const data = await apiService.getProperties(params);
      setProperties(data.data || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    setAppliedFilters(tempFilters);
    setShowFilters(false);
  };

  const formatPrice = (price: string) => {
    return `₦${parseInt(price).toLocaleString()}`;
  };

  const renderProperty = ({ item }: { item: Property }) => (
    <View style={styles.propertyCard}>
      <View style={styles.imageContainer}>
        <PropertyImageCarousel
          images={item.property_images}
          style={{
            width: screenWidth - 32,
            height: 200,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        />
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => router.push(`/property/${item.slug}`)}
        >
          <Ionicons name="eye" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.propertyContent}>
        <Text style={styles.propertyTitle}>{item.title}</Text>
        <Text style={styles.propertyPrice}>{formatPrice(item.price)}</Text>
        <Text style={styles.propertyLocation}>
          {item.address}, {item.city}
        </Text>
        <Text style={styles.propertyDescription} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.propertyDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="bed" size={16} color={Colors.gray} />
            <Text style={styles.detailText}>{item.beds} beds</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="water" size={16} color={Colors.gray} />
            <Text style={styles.detailText}>{item.baths} baths</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="home" size={16} color={Colors.gray} />
            <Text style={styles.detailText}>{item.rooms} rooms</Text>
          </View>
        </View>

        <View style={styles.propertyTags}>
          <Text style={styles.tag}>{item.type}</Text>
          <Text style={[styles.tag, styles.purposeTag]}>{item.purpose}</Text>
        </View>
      </View>
    </View>
  );

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterType === "all" || property.purpose === filterType;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <View style={[CommonStyles.container, styles.centered]}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading properties...</Text>
      </View>
    );
  }

  return (
    <View style={CommonStyles.container}>
      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={Colors.gray} />
          <TextInput
            placeholder="Search properties..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.gray}
          />
        </View>

        <View style={styles.filterContainer}>
          {["all", "rent", "sale"].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                filterType === filter && styles.activeFilter,
              ]}
              onPress={() => setFilterType(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  filterType === filter && styles.activeFilterText,
                ]}
              >
                {filter === "all" ? "All" : `For ${filter}`}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.advancedFilterButton}
            onPress={() => setShowFilters(true)}
          >
            <Ionicons name="options" size={16} color={Colors.primary} />
            <Text style={styles.advancedFilterText}>Filters</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Properties List */}
      <FlatList
        data={filteredProperties}
        renderItem={renderProperty}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      {/* Advanced Filters Modal */}
      <Modal visible={showFilters} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Advanced Filters</Text>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <Ionicons name="close" size={24} color={Colors.gray} />
              </TouchableOpacity>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Sort By</Text>
              <View style={styles.sortContainer}>
                <TouchableOpacity
                  style={[
                    styles.sortButton,
                    tempFilters.sortBy === "price" && styles.activeSortButton,
                  ]}
                  onPress={() =>
                    setTempFilters({ ...tempFilters, sortBy: "price" })
                  }
                >
                  <Text
                    style={[
                      styles.sortText,
                      tempFilters.sortBy === "price" && styles.activeSortText,
                    ]}
                  >
                    Price
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.sortButton,
                    tempFilters.sortBy === "created_at" &&
                      styles.activeSortButton,
                  ]}
                  onPress={() =>
                    setTempFilters({ ...tempFilters, sortBy: "created_at" })
                  }
                >
                  <Text
                    style={[
                      styles.sortText,
                      tempFilters.sortBy === "created_at" &&
                        styles.activeSortText,
                    ]}
                  >
                    Date
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.sortContainer}>
                <TouchableOpacity
                  style={[
                    styles.sortButton,
                    tempFilters.sortOrder === "ASC" && styles.activeSortButton,
                  ]}
                  onPress={() =>
                    setTempFilters({ ...tempFilters, sortOrder: "ASC" })
                  }
                >
                  <Text
                    style={[
                      styles.sortText,
                      tempFilters.sortOrder === "ASC" && styles.activeSortText,
                    ]}
                  >
                    Low to High
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.sortButton,
                    tempFilters.sortOrder === "DESC" && styles.activeSortButton,
                  ]}
                  onPress={() =>
                    setTempFilters({ ...tempFilters, sortOrder: "DESC" })
                  }
                >
                  <Text
                    style={[
                      styles.sortText,
                      tempFilters.sortOrder === "DESC" && styles.activeSortText,
                    ]}
                  >
                    High to Low
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Price Range</Text>
              <View style={styles.priceContainer}>
                <TextInput
                  style={styles.priceInput}
                  placeholder="Min Price"
                  value={tempFilters.minPrice}
                  onChangeText={(value) =>
                    setTempFilters({ ...tempFilters, minPrice: value })
                  }
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.priceInput}
                  placeholder="Max Price"
                  value={tempFilters.maxPrice}
                  onChangeText={(value) =>
                    setTempFilters({ ...tempFilters, maxPrice: value })
                  }
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Property Type</Text>
              <View style={styles.typeContainer}>
                {["all", "Apartments", "Houses", "Commercial"].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.typeButton,
                      tempFilters.propertyType === type &&
                        styles.activeTypeButton,
                    ]}
                    onPress={() =>
                      setTempFilters({ ...tempFilters, propertyType: type })
                    }
                  >
                    <Text
                      style={[
                        styles.typeText,
                        tempFilters.propertyType === type &&
                          styles.activeTypeText,
                      ]}
                    >
                      {type === "all" ? "All Types" : type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>City</Text>
              <TextInput
                style={styles.cityInput}
                placeholder="Enter city name"
                value={tempFilters.city}
                onChangeText={(value) =>
                  setTempFilters({ ...tempFilters, city: value })
                }
              />
            </View>

            <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.gray,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: "row",
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
  },
  activeFilter: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: Colors.gray,
  },
  activeFilterText: {
    color: Colors.white,
  },
  listContainer: {
    padding: 16,
  },
  propertyCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  propertyContent: {
    padding: 16,
  },
  imageContainer: {
    position: "relative",
  },
  viewButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
    padding: 8,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
    marginBottom: 4,
  },
  propertyPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 4,
  },
  propertyLocation: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 8,
  },
  propertyDescription: {
    fontSize: 14,
    color: Colors.darkGray,
    lineHeight: 20,
    marginBottom: 12,
  },
  propertyDetails: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: Colors.gray,
  },
  propertyTags: {
    flexDirection: "row",
    gap: 8,
  },
  tag: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    color: Colors.darkGray,
  },
  purposeTag: {
    backgroundColor: Colors.secondary,
    color: Colors.white,
  },
  advancedFilterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
    gap: 4,
  },
  advancedFilterText: {
    fontSize: 14,
    color: Colors.primary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.black,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
  },
  sortContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  sortButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.lightGray,
    alignItems: "center",
  },
  activeSortButton: {
    backgroundColor: Colors.primary,
  },
  sortText: {
    fontSize: 14,
    color: Colors.gray,
  },
  activeSortText: {
    color: Colors.white,
  },
  priceContainer: {
    flexDirection: "row",
    gap: 12,
  },
  priceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  typeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
  },
  activeTypeButton: {
    backgroundColor: Colors.primary,
  },
  typeText: {
    fontSize: 14,
    color: Colors.gray,
  },
  activeTypeText: {
    color: Colors.white,
  },
  cityInput: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  applyButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
