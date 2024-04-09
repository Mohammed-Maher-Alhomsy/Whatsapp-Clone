import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";

import * as SecureStore from "expo-secure-store";

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
      router.replace("/(tabs)/calls");
    } else if (!isSignedIn) {
      router.replace("/(tabs)/calls");
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
