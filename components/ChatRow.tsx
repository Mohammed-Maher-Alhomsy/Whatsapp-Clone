import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
} from "react-native";

import { format } from "date-fns";
import { Link } from "expo-router";

import Colors from "@/constants/Colors";
import AppleStyleSwipeableRow from "./AppleStyleSwipeableRow";

type Props = {
  id: string;
  img: string;
  msg: string;
  from: string;
  date: string;
  read: boolean;
  unreadCount: number;
};

const ChatRow = ({ id, date, from, img, msg, read, unreadCount }: Props) => {
  return (
    <AppleStyleSwipeableRow>
      <Link href={`/(tabs)/chats/${id}`} asChild>
        <TouchableHighlight underlayColor="#ddd">
          <View
            style={{
              gap: 14,
              paddingHorizontal: 20,
              paddingVertical: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              src={img}
              style={{ width: 50, height: 50, borderRadius: 50 }}
            />

            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{from}</Text>
              <Text style={{ fontSize: 16, color: Colors.gray }}>
                {msg.length > 40 ? `${msg.substring(0, 40)}...` : msg}
              </Text>
            </View>

            <Text style={{ color: Colors.gray, alignSelf: "flex-start" }}>
              {format(date, "MM.dd.yy")}
            </Text>
          </View>
        </TouchableHighlight>
      </Link>
    </AppleStyleSwipeableRow>
  );
};

export default ChatRow;

const styles = StyleSheet.create({});
