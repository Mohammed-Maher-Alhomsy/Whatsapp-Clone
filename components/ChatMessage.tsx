import {
  Bubble,
  type BubbleProps,
  type IMessage,
} from "react-native-gifted-chat";

import Colors from "@/constants/Colors";

type Props = {
  props: Readonly<BubbleProps<IMessage>>;
};

const ChatMessage = ({ props }: Props) => {
  return (
    <Bubble
      {...props}
      textStyle={{ right: { color: "#000" } }}
      wrapperStyle={{
        left: { backgroundColor: "#fff" },
        right: { backgroundColor: Colors.lightGreen },
      }}
    />
  );
};

export default ChatMessage;
