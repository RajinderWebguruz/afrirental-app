
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import * as SecureStore from "expo-secure-store";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

interface User {
  name: string;
  email: string;
  picture?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  signIn: (userData: User) => Promise<void>;
  signOut: () => Promise<void>;
  googleSignIn: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = "user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        GoogleSignin.configure({
          iosClientId:
            "5836881470-ug0qk7jg07ln9j7btojp1q1jd00f097j.apps.googleusercontent.com",
        });

        const storedUser = await SecureStore.getItemAsync(USER_STORAGE_KEY);
        if (storedUser) {
          setAuthState({
            isAuthenticated: true,
            user: JSON.parse(storedUser),
            isLoading: false,
          });
        } else {
          setAuthState((prevState) => ({ ...prevState, isLoading: false }));
        }
      } catch (error) {
        console.error("Failed to load user from storage", error);
        setAuthState((prevState) => ({ ...prevState, isLoading: false }));
      }
    };

    loadUser();
  }, []);

  const signIn = async (userData: User) => {
    try {
      await SecureStore.setItemAsync(
        USER_STORAGE_KEY,
        JSON.stringify(userData)
      );
      setAuthState({
        isAuthenticated: true,
        user: userData,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to save user to storage", error);
    }
  };

  const signOut = async () => {
    try {
      await SecureStore.deleteItemAsync(USER_STORAGE_KEY);
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        await GoogleSignin.signOut();
      }
      setAuthState({
        isAuthenticated: false,
        user: null,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const userData: User = {
        name: userInfo.user.name || "User",
        email: userInfo.user.email,
        picture: userInfo.user.photo || undefined,
      };
      await signIn(userData);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled the login flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Sign in is in progress already");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play services not available or outdated");
      } else {
        console.error("Google Sign-In error:", error);
      }
      // Re-throw the error to be handled by the caller if needed
      throw error;
    }
  };

  const value: AuthContextType = {
    ...authState,
    signIn,
    signOut,
    googleSignIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
