import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../constants/Colors";
import { CommonStyles } from "../constants/Styles";
import { apiService } from "../services/api";

interface Blog {
  id: number;
  title: string;
  description: string;
  image: string;
  author: string;
  publish_date: string;
  categories: Array<{ label: string; slug: string }>;
  slug: string;
}

export default function Blogs() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async (pageNum = 1, reset = false) => {
    if (pageNum === 1) setLoading(true);

    try {
      const data = await apiService.getBlogs(pageNum, 10);
      const newBlogs = data.data || [];

      if (reset || pageNum === 1) {
        setBlogs(newBlogs);
      } else {
        setBlogs((prev) => [...prev, ...newBlogs]);
      }

      setHasMore(newBlogs.length === 10);
      setPage(pageNum);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      fetchBlogs(page + 1);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "").substring(0, 150) + "...";
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderBlog = ({ item }: { item: Blog }) => (
    <TouchableOpacity
      style={styles.blogCard}
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
      <View style={styles.blogContent}>
        <View style={styles.categoryContainer}>
          {item.categories.map((category, index) => (
            <View key={index} style={styles.categoryTag}>
              <Text style={styles.categoryText}>{category.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.blogTitle}>{item.title}</Text>
        <Text style={styles.blogDescription}>
          {stripHtml(item.description)}
        </Text>

        <View style={styles.blogMeta}>
          <View style={styles.authorContainer}>
            <Ionicons name="person-circle" size={16} color={Colors.primary} />
            <Text style={styles.authorText}>{item.author}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Ionicons name="calendar" size={16} color={Colors.gray} />
            <Text style={styles.dateText}>{formatDate(item.publish_date)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Latest Insights</Text>
      <Text style={styles.headerSubtitle}>
        Stay updated with the latest trends and insights in African real estate
      </Text>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.gray} />
        <TextInput
          placeholder="Search articles..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={Colors.gray}
        />
      </View>
    </View>
  );

  const renderFooter = () => {
    if (!hasMore) return null;

    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={Colors.primary} />
        <Text style={styles.footerText}>Loading more articles...</Text>
      </View>
    );
  };

  if (loading && page === 1) {
    return (
      <View style={[CommonStyles.container, styles.centered]}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading articles...</Text>
      </View>
    );
  }

  return (
    <View style={CommonStyles.container}>
      <FlatList
        data={filteredBlogs}
        renderItem={renderBlog}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
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
  header: {
    padding: 20,
    backgroundColor: Colors.primary,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.white,
    marginBottom: 20,
    opacity: 0.9,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: Colors.black,
  },
  listContainer: {
    paddingBottom: 20,
  },
  blogCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
  },
  blogImage: {
    width: "100%",
    height: 200,
  },
  blogContent: {
    padding: 20,
  },
  categoryContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  categoryTag: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.white,
  },
  blogTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.black,
    marginBottom: 12,
    lineHeight: 26,
  },
  blogDescription: {
    fontSize: 16,
    color: Colors.darkGray,
    lineHeight: 24,
    marginBottom: 16,
  },
  blogMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  authorText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
    marginLeft: 6,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 14,
    color: Colors.gray,
    marginLeft: 6,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  footerText: {
    marginLeft: 10,
    fontSize: 14,
    color: Colors.gray,
  },
});
