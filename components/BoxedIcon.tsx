import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

type Props = {
  name: typeof Ionicons.defaultProps;
  backgroundColor: string;
};

const BoxedIcon = ({ backgroundColor, name }: Props) => {
  return (
    <View style={{ backgroundColor, padding: 4, borderRadius: 6 }}>
      <Ionicons name={name} color="white" size={22} />
    </View>
  );
};

export default BoxedIcon;

const styles = StyleSheet.create({});
