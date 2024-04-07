import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs>
        <Tabs.Screen
          name="chats"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbox" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="calls"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="call" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="updates"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cloud-upload" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="communities"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
};

export default Layout;

const styles = StyleSheet.create({});
