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

export default function OurServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await apiService.getExploreItems();
      setServices(data.data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderService = ({ item }: any) => (
    <View style={[{ width: 200, paddingVertical: 8, margin: 8 }]}>
      <Image
        source={{
          uri:
            item.image ||
            "https://img.freepik.com/premium-vector/hand-drawn-real-estate-agent-character-flat-style-isolated-background_1375-24731.jpg?semt=ais_hybrid&w=740&q=80",
        }}
        style={styles.serviceImage}
      />
      <Text style={styles.serviceTitle}>{item.title}</Text>
      <Text style={styles.serviceDescription} numberOfLines={3}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={CommonStyles.sectionTitle}>Our Services</Text>
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.primary}
          style={{ marginVertical: 20 }}
        />
      ) : (
        <FlatList
          data={services}
          renderItem={renderService}
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
  serviceImage: {
    width: "40%",
    height: 80,
    alignSelf: "center",
    borderRadius: 8,
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 4,
    textAlign: "center",
  },
  serviceDescription: {
    fontSize: 12,
    color: Colors.gray,
    lineHeight: 16,
    textAlign: "center",
  },
});
