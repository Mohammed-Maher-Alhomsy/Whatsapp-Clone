import { useState, useEffect, useCallback } from "react";
import { ImageBackground, StyleSheet } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IMessage, GiftedChat, SystemMessage } from "react-native-gifted-chat";

import Colors from "@/constants/Colors";
import ChatInput from "@/components/ChatInput";
import SendButton from "@/components/SendButton";
import ChatMessage from "@/components/ChatMessage";
import messagesData from "@/assets/data/messages.json";

const Page = () => {
  const [text, setText] = useState("");
  const { bottom } = useSafeAreaInsets();
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setMessages([
      ...messagesData.map((message) => ({
        _id: message.id,
        text: message.msg,
        createdAt: new Date(message.date),
        user: {
          _id: message.from,
          name: message.from ? "You" : "Bob",
        },
      })),

      {
        _id: 0,
        system: true,
        text: "All your base are belong to us",
        createdAt: new Date(),
        user: { _id: 0, name: "Bot" },
      },
    ]);
  }, []);

  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages((prev) => GiftedChat.append(prev, messages));
  }, []);

  return (
    <ImageBackground
      source={require("@/assets/images/pattern.png")}
      style={{
        flex: 1,
        marginBottom: bottom,
        backgroundColor: Colors.background,
      }}
    >
      <GiftedChat
        user={{ _id: 1 }}
        messages={messages}
        renderAvatar={null}
        bottomOffset={bottom}
        maxComposerHeight={100}
        onInputTextChanged={setText}
        textInputProps={styles.composer}
        onSend={(messages) => onSend(messages)}
        timeTextStyle={{ right: { color: Colors.primary } }}
        renderBubble={(props) => <ChatMessage props={props} />}
        renderSystemMessage={(props) => (
          <SystemMessage {...props} textStyle={{ color: Colors.gray }} />
        )}
        renderSend={(props) => <SendButton props={props} text={text} />}
        renderInputToolbar={(props) => <ChatInput props={props} />}
      />
    </ImageBackground>
  );
};

export default Page;

const styles = StyleSheet.create({
  composer: {
    fontSize: 16,
    paddingTop: 8,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderColor: Colors.lightGray,
  },
});
