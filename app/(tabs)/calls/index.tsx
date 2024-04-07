import { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";

import Colors from "@/constants/Colors";
import calls from "@/assets/data/calls.json";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";

const Page = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState(calls);

  const onEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Stack.Screen
        options={{
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity onPress={onEdit}>
              <Text style={{ color: Colors.primary, fontSize: 18 }}>
                {isEditing ? "Done" : "Edit"}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={defaultStyles.block}>
          <FlatList
            data={items}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            renderItem={({ item }) => (
              <View style={[defaultStyles.item]}>
                <Image style={styles.avatar} src={item.img} />

                <View style={{ flex: 1, gap: 2 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: item.missed ? Colors.red : "#000",
                    }}
                  >
                    {item.name}
                  </Text>

                  <View style={{ flexDirection: "row", gap: 4 }}>
                    <Ionicons
                      size={16}
                      color={Colors.gray}
                      name={item.video ? "videocam" : "call"}
                    />

                    <Text style={{ color: Colors.gray, flex: 1 }}>
                      {item.incoming ? "Incoming" : "Outgoing"}
                    </Text>
                  </View>
                </View>

                <View
                  style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
                >
                  <Text style={{ color: Colors.gray }}>
                    {format(item.date, "MM.dd.yy")}
                  </Text>
                  <Ionicons
                    size={24}
                    color={Colors.primary}
                    name="information-circle-outline"
                  />
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
