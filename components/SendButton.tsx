import { StyleSheet, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { IMessage, Send, SendProps } from "react-native-gifted-chat";

import Colors from "@/constants/Colors";

type Props = {
  text: string;
  props: SendProps<IMessage>;
};

const SendButton = ({ props, text }: Props) => {
  return (
    <View style={styles.constainer}>
      {text.length > 0 && (
        <Send {...props} containerStyle={{ justifyContent: "center" }}>
          <Ionicons name="send" color={Colors.primary} size={28} />
        </Send>
      )}

      {text.length === 0 && (
        <>
          <Ionicons name="camera-outline" color={Colors.primary} size={28} />
          <Ionicons name="mic-outline" size={28} color={Colors.primary} />
        </>
      )}
    </View>
  );
};

export default SendButton;

const styles = StyleSheet.create({
  constainer: {
    gap: 14,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    justifyContent: "center",
  },
});
