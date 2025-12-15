
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { Colors } from "../constants/Colors";
import { CommonStyles } from "../constants/Styles";

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
}

const LoginModal = ({ visible, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, googleSignIn } = useAuth();

  const handleNormalLogin = async () => {
    if (!email || !password) {
      Alert.alert("Login Failed", "Please enter both email and password.");
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(async () => {
      // In a real app, you would validate credentials against a server
      const dummyUser = {
        name: email.split("@")[0],
        email: email,
      };
      await signIn(dummyUser);
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await googleSignIn();
      onClose();
    } catch (error) {
      Alert.alert("Google Sign-In Failed", "An error occurred during Google Sign-In.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close-circle" size={30} color={Colors.gray} />
          </TouchableOpacity>

          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor={Colors.gray}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={Colors.gray}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={[CommonStyles.button, styles.loginButton]}
            onPress={handleNormalLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text style={CommonStyles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity
            style={[styles.socialButton, styles.googleButton]}
            onPress={handleGoogleLogin}
            disabled={isLoading}
          >
            <Ionicons name="logo-google" size={20} color={Colors.white} />
            <Text style={styles.socialButtonText}>Sign In with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.black,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray,
    marginBottom: 24,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  loginButton: {
    width: "100%",
    marginTop: 8,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.lightGray,
  },
  dividerText: {
    marginHorizontal: 12,
    color: Colors.gray,
    fontWeight: "600",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  googleButton: {
    backgroundColor: "#4285F4",
  },
  socialButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
  },
});

export default LoginModal;
