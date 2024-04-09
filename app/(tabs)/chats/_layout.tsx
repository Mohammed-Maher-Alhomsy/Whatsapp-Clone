import { TouchableOpacity, View, Text, Image } from "react-native";

import { Link, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import Colors from "@/constants/Colors";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Chats",

          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 30 }}>
              <TouchableOpacity>
                <Ionicons
                  name="camera-outline"
                  color={Colors.primary}
                  size={30}
                />
              </TouchableOpacity>

              <Link href="/(modals)/new-chat" asChild>
                <TouchableOpacity>
                  <Ionicons
                    name="add-circle"
                    color={Colors.primary}
                    size={30}
                  />
                </TouchableOpacity>
              </Link>
            </View>
          ),

          headerStyle: { backgroundColor: "#fff" },
          headerSearchBarOptions: { placeholder: "Search" },
        }}
      />

      <Stack.Screen
        name="[id]"
        options={{
          title: "",
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                width: 220,
                alignItems: "center",
                gap: 10,
                paddingBottom: 4,
              }}
            >
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnjXkR3EZAsV19ot8qU7xqr33qfD8J01vggdtBfBjYgQ&s",
                }}
                style={{ width: 40, height: 40, borderRadius: 50 }}
              />
              <Text style={{ fontSize: 16, fontWeight: "500" }}>Maher</Text>
            </View>
          ),

          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 30 }}>
              <TouchableOpacity>
                <Ionicons
                  name="videocam-outline"
                  color={Colors.primary}
                  size={30}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons
                  name="call-outline"
                  color={Colors.primary}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
          headerStyle: {
            backgroundColor: Colors.background,
          },
        }}
      />
    </Stack>
  );
};
export default Layout;
