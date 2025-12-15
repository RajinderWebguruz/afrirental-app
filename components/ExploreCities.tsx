import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../constants/Colors";
import { CommonStyles } from "../constants/Styles";
import { apiService } from "../services/api";

export default function ExploreCities() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const data = await apiService.getLocations();
      setCities(data.data || []);
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderCity = ({ item }: any) => (
    <View
      style={[
        CommonStyles.card,
        { width: 150, paddingVertical: 8, marginVertical: 8 },
      ]}
    >
      <Image
        source={{
          uri:
            item.image ||
            "https://img.freepik.com/premium-vector/hand-drawn-real-estate-agent-character-flat-style-isolated-background_1375-24731.jpg?semt=ais_hybrid&w=740&q=80",
        }}
        style={styles.cityImage}
      />
      <Text style={styles.cityName}>{item.name}</Text>
      <Text style={styles.cityCount}>{item.property_count} properties</Text>
    </View>
  );

  return (
    <View style={styles.section}>
      <Text style={CommonStyles.sectionTitle}>Explore Cities</Text>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.primary}
          style={{ marginVertical: 20 }}
        />
      ) : (
        <FlatList
          data={cities}
          renderItem={renderCity}
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
    marginVertical: 8,
  },
  horizontalList: {
    paddingLeft: 8,
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
});
