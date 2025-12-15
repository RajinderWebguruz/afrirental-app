import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";
import { CommonStyles } from "../constants/Styles";

const benefits = [
  {
    id: "1",
    title: "Verified Listings",
    description: "All properties are verified and authentic",
    icon: "checkmark-circle",
  },
  {
    id: "2",
    title: "24/7 Support",
    description: "Round-the-clock customer support",
    icon: "headset",
  },
  {
    id: "3",
    title: "Best Prices",
    description: "Competitive pricing guaranteed",
    icon: "pricetag",
  },
];

export default function OurBenefits() {
  const renderBenefit = ({ item }: any) => (
    <View style={[CommonStyles.card, { width: 160 }]}>
      <Ionicons
        name={item.icon as any}
        size={32}
        color={Colors.secondary}
        style={{ marginBottom: 8, alignSelf: "center" }}
      />
      <Text style={styles.benefitTitle}>{item.title}</Text>
      <Text style={styles.benefitDescription}>{item.description}</Text>
    </View>
  );

  return (
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
  );
}

const styles = StyleSheet.create({
  section: {
    padding: 16,
  },
  horizontalList: {
    paddingLeft: 8,
  },
  benefitTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 4,
    textAlign: "center",
  },
  benefitDescription: {
    fontSize: 12,
    color: Colors.gray,
    textAlign: "center",
  },
});
