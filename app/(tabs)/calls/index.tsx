import { useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";

import { Stack } from "expo-router";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  CurvedTransition,
} from "react-native-reanimated";

import Colors from "@/constants/Colors";
import calls from "@/assets/data/calls.json";
import CallsList from "@/components/CallsList";
import { defaultStyles } from "@/constants/Styles";
import { SegmentedControl } from "@/components/SegmentedControl";

const transition = CurvedTransition.delay(100);

const Page = () => {
  const editing = useSharedValue(-30);
  const [items, setItems] = useState(calls);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All");

  const onEdit = () => {
    const editingNew = !isEditing;
    editing.value = editingNew ? 0 : -30;
    setIsEditing(editingNew);
  };

  useEffect(() => {
    if (selectedOption === "All") {
      setItems(calls);
    } else {
      setItems(calls.filter((call) => call.missed));
    }
  }, [selectedOption]);

  const onDelete = (id: string) => {
    const newItems = items.filter((item) => item.id !== id);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setItems(newItems);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Stack.Screen
        options={{
          headerTitleAlign: "center",

          headerTitle: () => (
            <SegmentedControl
              options={["All", "Missed"]}
              selectedOption={selectedOption}
              onOptionPress={setSelectedOption}
            />
          ),

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
        <Animated.View style={defaultStyles.block} layout={transition}>
          <CallsList items={items} onDelete={onDelete} editing={editing} />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default Page;
