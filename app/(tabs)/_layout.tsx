import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Link, Tabs } from "expo-router";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";

const Layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: Colors.background,
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveBackgroundColor: Colors.background,
          tabBarActiveBackgroundColor: Colors.background,
          headerStyle: { backgroundColor: Colors.background },
          headerShadowVisible: false,
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tabs.Screen
          name="updates"
          options={{
            title: "Updates",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="update" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="calls"
          options={{
            title: "Calls",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="phone-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="communities"
          options={{
            title: "Communities",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="people" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="chats"
          options={{
            title: "Chats",
            headerTitleStyle: { display: "none" },
            headerStyle: { backgroundColor: "#fff" },

            headerRight: () => (
              <View style={{ flexDirection: "row", gap: 30 }}>
                <TouchableOpacity>
                  <Ionicons
                    size={30}
                    name="camera-outline"
                    color={Colors.primary}
                  />
                </TouchableOpacity>

                <Link href="/" asChild>
                  <TouchableOpacity>
                    <Ionicons
                      size={30}
                      name="add-circle"
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                </Link>
              </View>
            ),

            headerLeft: () => (
              <TouchableOpacity>
                <Ionicons
                  size={30}
                  color={Colors.primary}
                  name="ellipsis-horizontal-circle-outline"
                />
              </TouchableOpacity>
            ),

            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubbles" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            // title: "Settings",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cog" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
};

export default Layout;

const styles = StyleSheet.create({});
