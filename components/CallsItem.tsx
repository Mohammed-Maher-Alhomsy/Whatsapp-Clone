import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { format } from "date-fns";
import { Ionicons } from "@expo/vector-icons";

import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

type Props = {
  img: string;
  name: string;
  date: string;
  video: boolean;
  missed: boolean;
  incoming: boolean;
};

const CallsItem = ({ img, missed, name, video, incoming, date }: Props) => {
  return (
    <View style={[defaultStyles.item]}>
      <Image style={styles.avatar} src={img} />

      <View style={{ flex: 1, gap: 2 }}>
        <Text
          style={{
            fontSize: 18,
            color: missed ? Colors.red : "#000",
          }}
        >
          {name}
        </Text>

        <View style={{ flexDirection: "row", gap: 4 }}>
          <Ionicons
            size={16}
            color={Colors.gray}
            name={video ? "videocam" : "call"}
          />

          <Text style={{ color: Colors.gray, flex: 1 }}>
            {incoming ? "Incoming" : "Outgoing"}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 6,
          alignItems: "center",
        }}
      >
        <Text style={{ color: Colors.gray }}>{format(date, "MM.dd.yy")}</Text>
        <Ionicons
          size={24}
          color={Colors.primary}
          name="information-circle-outline"
        />
      </View>
    </View>
  );
};

export default CallsItem;

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
