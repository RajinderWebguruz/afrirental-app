import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { CommonStyles } from "../../constants/Styles";
import { apiService } from "../../services/api";

interface BlogDetail {
  id: number;
  title: string;
  description: string;
  image: string;
  author: string;
  publish_date: string;
  categories: Array<{ label: string; slug: string }>;
  slug: string;
}

export default function BlogDetail() {
  const { slug } = useLocalSearchParams();
  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogDetail();
  }, [slug]);

  const fetchBlogDetail = async () => {
    try {
      const data = await apiService.getBlogs(1, 100);
      const foundBlog = data.data?.find((b: BlogDetail) => b.slug === slug);
      setBlog(foundBlog || null);
    } catch (error) {
      console.error("Error fetching blog detail:", error);
    } finally {
      setLoading(false);
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

  const handleShare = async () => {
    if (!blog) return;

    try {
      await Share.share({
        message: `${blog.title}\n\nRead more at AfriRentals`,
        title: blog.title,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const renderHtmlContent = (html: string) => {
    return html
      .replace(/<h3[^>]*>/g, "\n\n")
      .replace(/<\/h3>/g, "\n")
      .replace(/<h4[^>]*>/g, "\n\n")
      .replace(/<\/h4>/g, "\n")
      .replace(/<p[^>]*>/g, "\n\n")
      .replace(/<\/p>/g, "")
      .replace(/<li[^>]*>/g, "\n• ")
      .replace(/<\/li>/g, "")
      .replace(/<ul[^>]*>/g, "\n")
      .replace(/<\/ul>/g, "\n")
      .replace(/<strong[^>]*>/g, "")
      .replace(/<\/strong>/g, "")
      .replace(/<br\s*\/?>/g, "\n")
      .replace(/<[^>]*>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .trim();
  };

  if (loading) {
    return (
      <View style={[CommonStyles.container, styles.centered]}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading article...</Text>
      </View>
    );
  }

  if (!blog) {
    return (
      <View style={[CommonStyles.container, styles.centered]}>
        <Ionicons name="document-text-outline" size={64} color={Colors.gray} />
        <Text style={styles.errorText}>Article not found</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={CommonStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                blog.image ||
                "https://img.freepik.com/premium-vector/hand-drawn-real-estate-agent-character-flat-style-isolated-background_1375-24731.jpg?semt=ais_hybrid&w=740&q=80",
            }}
            style={styles.heroImage}
          />
          <View style={styles.imageOverlay}>
            <TouchableOpacity
              style={styles.backIconButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Ionicons name="share-outline" size={24} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.categoryContainer}>
            {blog.categories.map((category, index) => (
              <View key={index} style={styles.categoryTag}>
                <Text style={styles.categoryText}>{category.label}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.title}>{blog.title}</Text>

          <View style={styles.metaContainer}>
            <View style={styles.authorContainer}>
              <Ionicons name="person-circle" size={20} color={Colors.primary} />
              <Text style={styles.authorText}>{blog.author}</Text>
            </View>
            <View style={styles.dateContainer}>
              <Ionicons name="calendar" size={20} color={Colors.gray} />
              <Text style={styles.dateText}>
                {formatDate(blog.publish_date)}
              </Text>
            </View>
          </View>

          <View style={styles.articleContent}>
            <Text style={styles.articleText}>
              {renderHtmlContent(blog.description)}
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Published by AfriRentals - Your gateway to African real estate
            </Text>
          </View>
        </View>
      </ScrollView>
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
  errorText: {
    fontSize: 18,
    color: Colors.gray,
    marginTop: 16,
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  imageContainer: {
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: 250,
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 20,
    paddingTop: 50,
  },
  backIconButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 8,
  },
  shareButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: 20,
  },
  categoryContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  categoryTag: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.black,
    lineHeight: 32,
    marginBottom: 16,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  authorText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "600",
    marginLeft: 8,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 14,
    color: Colors.gray,
    marginLeft: 8,
  },
  articleContent: {
    marginBottom: 32,
  },
  articleText: {
    fontSize: 16,
    lineHeight: 26,
    color: Colors.darkGray,
    textAlign: "justify",
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    paddingTop: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: "center",
    fontStyle: "italic",
  },
});
