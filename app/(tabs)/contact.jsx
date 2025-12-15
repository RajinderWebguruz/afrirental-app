import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import { CommonStyles } from "../../constants/Styles";
import { apiService } from "../../services/api";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [faqLoading, setFaqLoading] = useState(true);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const data = await apiService.getFAQ();
      setFaqs(data.data || []);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setFaqLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await apiService.submitContact(formData);
      Alert.alert("Success", "Your message has been sent successfully!");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      Alert.alert("Error", "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const socialIcons = [
    {
      name: "logo-instagram",
      color: "#E4405F",
      link: "https://www.instagram.com/afrirentals",
    },
    {
      name: "logo-pinterest",
      color: "#FF0000",
      link: "https://www.pinterest.com/afrirentals/",
    },
    {
      name: "logo-facebook",
      color: "#1877F2",
      link: "https://www.facebook.com/afrirentals/",
    },
    {
      name: "logo-youtube",
      color: "#FF0000",
      link: "https://www.youtube.com/@afrirentals",
    },
  ];

  return (
    <SafeAreaView style={CommonStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contactCard}>
          <Text style={styles.cardTitle}>Contact Us</Text>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Address:</Text>
            <Text style={styles.infoText}>
              Available Across African Online Platform
            </Text>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Information:</Text>
            <View style={styles.contactItem}>
              <Ionicons name="call" size={20} color={Colors.primary} />
              <Text style={styles.contactText}>+1 (331) 688-1335</Text>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="mail" size={20} color={Colors.primary} />
              <Text style={styles.contactText}>contact@afrirentals.com</Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Opentime:</Text>
            <Text style={styles.infoText}>Monday–Friday, 9AM to 5PM CST</Text>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Follow Us:</Text>
            <View style={styles.socialContainer}>
              {socialIcons.map((social, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.socialIcon}
                  onPress={() => Linking.openURL(social.link)}
                >
                  <Ionicons name={social.name} size={24} color={social.color} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Send us a message</Text>

          <View style={styles.form}>
            <TextInput
              placeholder="Your Name *"
              style={styles.input}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholderTextColor={Colors.gray}
            />

            <TextInput
              placeholder="Your Email *"
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              placeholderTextColor={Colors.gray}
              keyboardType="email-address"
            />

            <TextInput
              placeholder="Phone Number"
              style={styles.input}
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              placeholderTextColor={Colors.gray}
              keyboardType="phone-pad"
            />

            <TextInput
              placeholder="Subject"
              style={styles.input}
              value={formData.subject}
              onChangeText={(text) =>
                setFormData({ ...formData, subject: text })
              }
              placeholderTextColor={Colors.gray}
            />

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
              style={[CommonStyles.button, loading && styles.disabledButton]}
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

        <View style={styles.faqContainer}>
          <Text style={styles.faqTitle}>Frequently Asked Questions</Text>

          {faqLoading ? (
            <ActivityIndicator
              size="large"
              color={Colors.primary}
              style={{ marginVertical: 20 }}
            />
          ) : (
            faqs.map((faq) => (
              <View key={faq.id} style={styles.faqItem}>
                <TouchableOpacity
                  style={styles.faqQuestion}
                  onPress={() =>
                    setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)
                  }
                >
                  <Text style={styles.questionText}>{faq.question}</Text>
                  <Ionicons
                    name={
                      expandedFAQ === faq.id ? "chevron-up" : "chevron-down"
                    }
                    size={20}
                    color={Colors.primary}
                  />
                </TouchableOpacity>

                {expandedFAQ === faq.id && (
                  <View style={styles.faqAnswer}>
                    <Text style={styles.answerText}>{faq.answer}</Text>
                  </View>
                )}
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contactCard: {
    backgroundColor: Colors.white,
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 20,
    textAlign: "center",
  },
  infoSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: Colors.darkGray,
    lineHeight: 20,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  contactText: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  socialIcon: {
    padding: 8,
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
  faqContainer: {
    padding: 16,
    paddingTop: 0,
  },
  faqTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 16,
  },
  faqItem: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  faqQuestion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
    flex: 1,
    marginRight: 12,
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  answerText: {
    fontSize: 14,
    color: Colors.darkGray,
    lineHeight: 20,
    paddingTop: 12,
  },
});
