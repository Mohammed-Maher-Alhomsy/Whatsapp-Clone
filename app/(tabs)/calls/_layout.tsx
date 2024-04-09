import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

import Colors from "@/constants/Colors";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        title: "Calls",
        headerLargeTitle: true,
        headerShadowVisible: false,
        headerStyle: { backgroundColor: Colors.background },
        headerSearchBarOptions: { placeholder: "Search" },

        headerRight: () => (
          <TouchableOpacity>
            <Ionicons name="call-outline" color={Colors.primary} size={30} />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default Layout;
