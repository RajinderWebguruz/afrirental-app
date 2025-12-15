import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../constants/Colors";
import { CommonStyles } from "../constants/Styles";
import { apiService } from "../services/api";

export default function WhatsNew() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await apiService.getBlogs(1, 5);
      setBlogs(data.data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const renderBlog = ({ item }: any) => (
    <TouchableOpacity
      style={[
        CommonStyles.card,
        {
          width: 200,
          paddingVertical: 8,
          marginVertical: 8,
          borderWidth: 1,
          borderColor: Colors.lightGray,
        },
      ]}
      onPress={() => router.push(`/blog/${item.slug}`)}
    >
      <Image
        source={{
          uri:
            item.image ||
            "https://img.freepik.com/premium-vector/hand-drawn-real-estate-agent-character-flat-style-isolated-background_1375-24731.jpg?semt=ais_hybrid&w=740&q=80",
        }}
        style={styles.blogImage}
      />
      <Text style={styles.blogTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.blogAuthor}>By {item.author}</Text>
      <Text style={styles.blogDate}>{formatDate(item.publish_date)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={CommonStyles.sectionTitle}>What's New</Text>
        <TouchableOpacity onPress={() => router.push("/blogs")}>
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
          data={blogs}
          renderItem={renderBlog}
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
    lineHeight: 18,
  },
  blogAuthor: {
    fontSize: 12,
    color: Colors.primary,
    marginBottom: 2,
  },
  blogDate: {
    fontSize: 12,
    color: Colors.gray,
  },
});
