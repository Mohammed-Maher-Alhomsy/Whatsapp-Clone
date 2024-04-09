import { useEffect } from "react";
import { Link, Stack, useRouter, useSegments } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";

import * as SecureStore from "expo-secure-store";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      return null;
    }
  },

  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (error) {
      return;
    }
  },
};

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const router = useRouter();
  const segments = useSegments();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === "(tabs)";

    console.log("isSignedIn changed", isSignedIn);

    if (isSignedIn && !inTabsGroup) {
      router.replace("/(tabs)/chats");
    } else if (!isSignedIn) {
      router.replace("/(tabs)/chats");
    }
  }, [isSignedIn]);

  if (!loaded || !isLoaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ statusBarStyle: "dark" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen
        name="otp"
        options={{ headerTitle: "Enter Your Phone Number" }}
      />

      <Stack.Screen
        name="verify/[phone]"
        options={{
          headerBackTitle: "Edit number",
        }}
      />

      <Stack.Screen
        name="(tabs)"
        options={{ headerBackTitleVisible: false, headerShown: false }}
      />

      <Stack.Screen
        name="(modals)/new-chat"
        options={{
          title: "New Chat",
          presentation: "modal",
          // headerTransparent: true,
          headerBlurEffect: "regular",
          headerStyle: { backgroundColor: Colors.background },
          headerSearchBarOptions: {
            hideWhenScrolling: false,
            placeholder: "Search name or number",
          },

          // headerRight: () => (
          //   <Link href="/(tabs)/chats" asChild>
          //     <TouchableOpacity
          //       style={{
          //         padding: 4,
          //         borderRadius: 20,
          //         backgroundColor: Colors.lightGray,
          //       }}
          //     >
          //       <Ionicons name="close" color={Colors.gray} size={30} />
          //     </TouchableOpacity>
          //   </Link>
          // ),
        }}
      />
    </Stack>
  );
};

function RootLayoutNav() {
  return (
    <ClerkProvider
      publishableKey={clerkPublishableKey!}
      tokenCache={tokenCache}
    >
      <InitialLayout />
    </ClerkProvider>
  );
}

export default RootLayoutNav;
