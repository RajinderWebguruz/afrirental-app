import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../constants/Colors";

export default function HeroSection() {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("For Rent");
  const [qry, setQry] = useState("");

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const selectOption = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  const handleSearch = (query: string) => {
    router.push(
      `/properties?type=${
        selectedOption === "For Rent" ? "rent" : "sale"
      }&qry=${query}`
    );
  };

  return (
    <View style={styles.hero}>
      <Text style={styles.heroTitle}>Find Your Dream Property</Text>
      <Text style={styles.heroSubtitle}>
        Discover the best real estate deals in Africa
      </Text>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search properties..."
            style={styles.searchInput}
            placeholderTextColor={Colors.gray}
            value={qry}
            onChangeText={setQry}
            onSubmitEditing={() => handleSearch(qry)}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Ionicons
            name="search"
            size={20}
            color={Colors.gray}
            onPress={() => handleSearch(qry)}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={toggleDropdown}
          >
            <Text style={styles.filterText}>{selectedOption}</Text>
            <Ionicons name="chevron-down" size={16} color={Colors.white} />
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdown}>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => selectOption("For Rent")}
              >
                <Text style={styles.dropdownText}>For Rent</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => selectOption("For Sale")}
              >
                <Text style={styles.dropdownText}>For Sale</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
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
  dropdown: {
    position: "absolute",
    top: "100%",
    right: 0,
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginTop: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownText: {
    color: Colors.gray,
    fontSize: 16,
  },
});
