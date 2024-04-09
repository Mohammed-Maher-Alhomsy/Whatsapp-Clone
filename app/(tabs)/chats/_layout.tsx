import { Link, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

import Colors from "@/constants/Colors";
import { View } from "react-native";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        title: "Chats",
        headerLargeTitle: true,
        headerShadowVisible: false,
        headerBlurEffect: "regular",
        headerStyle: { backgroundColor: "#fff" },
        headerSearchBarOptions: { placeholder: "Search" },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default Layout;
