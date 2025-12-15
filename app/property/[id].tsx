import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PropertyImageCarousel from "../../components/PropertyImageCarousel";
import { Colors } from "../../constants/Colors";
import { CommonStyles } from "../../constants/Styles";
import { apiService } from "../../services/api";

interface PropertyDetail {
  id: number;
  title: string;
  description: string;
  price: number;
  rooms: number;
  beds: number;
  baths: number;
  garage: number;
  sqft: number;
  year_built: number;
  type: string;
  purpose: string;
  city: string;
  address: string;
  slug: string;
  images: Array<{ image_src: string; image_title: string }>;
  amenities: Array<{ name: string }>;
  user: {
    name: string;
    email: string;
    number: string;
  };
}

export default function PropertyDetail() {
  const { id } = useLocalSearchParams();
  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchPropertyDetail();
  }, [id]);

  const fetchPropertyDetail = async () => {
    try {
      const data = await apiService.getPropertyBySlug(id as string);
      setProperty(data.data || null);
    } catch (error) {
      console.error("Error fetching property detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  const handleShare = async () => {
    if (!property) return;

    try {
      await Share.share({
        message: `${property.title}\n${formatPrice(property.price)}\n${
          property.address
        }, ${property.city}`,
        title: property.title,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleContact = async (phone?: string) => {
    if (!phone) return;

    const url = `tel:${phone}`;
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(
        "Cannot make a call",
        "Your device does not support phone calls or has no dialer app installed."
      );
    }
  };

  const handleEmail = async () => {
    const email = property?.user?.email;
    if (!email) return;

    const url = `mailto:${email}`;
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(
        "No Email App Found",
        "It looks like no email client is installed on this device."
      );
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await apiService.submitPropertyContact({
        ...formData,
        property_id: property?.id,
      });
      Alert.alert("Success", "Your message has been sent successfully!");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      Alert.alert("Error", "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[CommonStyles.container, styles.centered]}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading property details...</Text>
      </View>
    );
  }

  if (!property) {
    return (
      <View style={[CommonStyles.container, styles.centered]}>
        <Ionicons name="home-outline" size={64} color={Colors.gray} />
        <Text style={styles.errorText}>Property not found</Text>
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <View style={styles.imageContainer}>
          <PropertyImageCarousel
            images={property.images || []}
            style={{ width: "100%", height: 300 }}
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
          <View style={styles.header}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{formatPrice(property.price)}</Text>
              <View style={styles.purposeTag}>
                <Text style={styles.purposeText}>For {property.purpose}</Text>
              </View>
            </View>
            <Text style={styles.title}>{property.title}</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location" size={16} color={Colors.gray} />
              <Text style={styles.location}>
                {property.address}, {property.city}
              </Text>
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.sectionTitle}>Property Details</Text>
            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Ionicons name="bed" size={20} color={Colors.primary} />
                <Text style={styles.detailLabel}>Bedrooms</Text>
                <Text style={styles.detailValue}>{property.beds}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="water" size={20} color={Colors.primary} />
                <Text style={styles.detailLabel}>Bathrooms</Text>
                <Text style={styles.detailValue}>{property.baths}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="home" size={20} color={Colors.primary} />
                <Text style={styles.detailLabel}>Rooms</Text>
                <Text style={styles.detailValue}>{property.rooms}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="car" size={20} color={Colors.primary} />
                <Text style={styles.detailLabel}>Garage</Text>
                <Text style={styles.detailValue}>{property.garage}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="resize" size={20} color={Colors.primary} />
                <Text style={styles.detailLabel}>Size</Text>
                <Text style={styles.detailValue}>{property.sqft} sqft</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="calendar" size={20} color={Colors.primary} />
                <Text style={styles.detailLabel}>Built</Text>
                <Text style={styles.detailValue}>{property.year_built}</Text>
              </View>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{property.description}</Text>
          </View>

          {property.amenities && property.amenities.length > 0 && (
            <View style={styles.amenitiesContainer}>
              <Text style={styles.sectionTitle}>Amenities</Text>
              <View style={styles.amenitiesGrid}>
                {property.amenities.map((amenity, index) => (
                  <View key={index} style={styles.amenityItem}>
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color={Colors.secondary}
                    />
                    <Text style={styles.amenityText}>{amenity.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={styles.ownerContainer}>
            <Text style={styles.sectionTitle}>Contact Owner</Text>
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Send us a message</Text>

              <View style={styles.form}>
                <TextInput
                  placeholder="Your Name *"
                  style={styles.input}
                  value={formData.name}
                  onChangeText={(text) =>
                    setFormData({ ...formData, name: text })
                  }
                  placeholderTextColor={Colors.gray}
                />

                <TextInput
                  placeholder="Your Email *"
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) =>
                    setFormData({ ...formData, email: text })
                  }
                  placeholderTextColor={Colors.gray}
                  keyboardType="email-address"
                />

                <TextInput
                  placeholder="Phone Number"
                  style={styles.input}
                  value={formData.phone}
                  onChangeText={(text) =>
                    setFormData({ ...formData, phone: text })
                  }
                  placeholderTextColor={Colors.gray}
                  keyboardType="phone-pad"
                />

                {/* <TextInput
                  placeholder="Subject"
                  style={styles.input}
                  value={formData.subject}
                  onChangeText={(text) =>
                    setFormData({ ...formData, subject: text })
                  }
                  placeholderTextColor={Colors.gray}
                /> */}

                <TextInput
                  placeholder="Your Message *"
                  style={[styles.input, styles.textArea]}
                  value={formData.message}
                  onChangeText={(text) =>
                    setFormData({ ...formData, message: text })
                  }
                  placeholderTextColor={Colors.gray}
                  multiline
                  numberOfLines={4}
                />

                <TouchableOpacity
                  style={[
                    CommonStyles.button,
                    loading && styles.disabledButton,
                  ]}
                  onPress={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color={Colors.white} />
                  ) : (
                    <Text style={CommonStyles.buttonText}>Send Message</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.ownerCard}>
              <View style={styles.ownerInfo}>
                <Ionicons
                  name="person-circle"
                  size={40}
                  color={Colors.primary}
                />
                <View style={styles.ownerDetails}>
                  <Text style={styles.ownerName}>{property.user.name}</Text>
                  <Text style={styles.ownerRole}>Property Owner</Text>
                </View>
              </View>
              <View style={styles.contactButtons}>
                <TouchableOpacity
                  style={styles.contactButton}
                  onPress={() => handleContact(property.user.number)}
                >
                  <Ionicons name="call" size={20} color={Colors.white} />
                  <Text style={styles.contactButtonText}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.contactButton}
                  onPress={handleEmail}
                >
                  <Ionicons name="mail" size={20} color={Colors.white} />
                  <Text style={styles.contactButtonText}>Email</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  header: {
    marginBottom: 24,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary,
  },
  purposeTag: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  purposeText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.black,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontSize: 16,
    color: Colors.gray,
    marginLeft: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.black,
    marginBottom: 16,
  },
  detailsContainer: {
    marginBottom: 24,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  detailItem: {
    width: "30%",
    alignItems: "center",
    padding: 12,
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
  },
  detailLabel: {
    fontSize: 12,
    color: Colors.gray,
    marginTop: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.black,
    marginTop: 2,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.darkGray,
  },
  amenitiesContainer: {
    marginBottom: 24,
  },
  amenitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  amenityItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  amenityText: {
    fontSize: 14,
    color: Colors.darkGray,
    marginLeft: 6,
  },
  ownerContainer: {
    marginBottom: 24,
  },
  ownerCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  ownerInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  ownerDetails: {
    marginLeft: 12,
  },
  ownerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
  },
  ownerRole: {
    fontSize: 14,
    color: Colors.gray,
  },
  contactButtons: {
    flexDirection: "row",
    gap: 12,
  },
  contactButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  contactButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  formContainer: {
    padding: 16,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 16,
  },
  form: {
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: Colors.white,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  disabledButton: {
    opacity: 0.6,
  },
});
