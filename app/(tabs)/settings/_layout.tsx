import { StyleSheet } from "react-native";
import { Stack } from "expo-router";
import Colors from "@/constants/Colors";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        title: "Settings",
        headerLargeTitle: true,
        headerShadowVisible: false,
        headerStyle: { backgroundColor: Colors.background },
        headerSearchBarOptions: {
          placeholder: "Search",
        },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default Layout;

const styles = StyleSheet.create({});
