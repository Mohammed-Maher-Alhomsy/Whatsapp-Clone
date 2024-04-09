import { View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import {
  InputToolbar,
  type IMessage,
  type InputToolbarProps,
} from "react-native-gifted-chat";

import Colors from "@/constants/Colors";

type Props = {
  props: InputToolbarProps<IMessage>;
};

const ChatInput = ({ props }: Props) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: Colors.background,
        paddingTop: 5,
      }}
      renderActions={(props) => (
        <View {...props} style={{ alignSelf: "center" }}>
          <Ionicons name="add" size={28} color={Colors.primary} />
        </View>
      )}
    />
  );
};

export default ChatInput;
