import { FlatList, ScrollView, StyleSheet, View } from "react-native";

import ChatRow from "@/components/ChatRow";
import chats from "@/assets/data/chats.json";
import { defaultStyles } from "@/constants/Styles";

const Page = () => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ backgroundColor: "#fff" }}
    >
      <FlatList
        data={chats}
        scrollEnabled={false}
        ItemSeparatorComponent={() => (
          <View style={[defaultStyles.separator, { marginLeft: 90 }]} />
        )}
        renderItem={({ item }) => <ChatRow {...item} />}
      />
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({});
