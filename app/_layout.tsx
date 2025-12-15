import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, Image } from "react-native";
import { Colors } from "../constants/Colors";
import { AuthProvider, useAuth } from "../context/AuthContext";
import LoginModal from "../components/LoginModal";

function RootLayoutNav() {
  const { isAuthenticated, user, signOut } = useAuth();
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);

  const handleUserIconPress = () => {
    if (isAuthenticated) {
      signOut();
    } else {
      setLoginModalVisible(true);
    }
  };

  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.white,
          },
          headerTintColor: Colors.primary,
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16 }}
              onPress={handleUserIconPress}
            >
              {isAuthenticated && user?.picture ? (
                <Image
                  source={{ uri: user.picture }}
                  style={{ width: 32, height: 32, borderRadius: 16 }}
                />
              ) : (
                <Ionicons
                  name={isAuthenticated ? "person-circle" : "person-outline"}
                  size={28}
                  color={Colors.primary}
                />
              )}
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="properties"
          options={{ title: "Properties", headerBackTitle: "home" }}
        />
        <Stack.Screen name="blogs" options={{ title: "Latest Insights" }} />
      </Stack>
      <LoginModal
        visible={isLoginModalVisible}
        onClose={() => setLoginModalVisible(false)}
      />
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
