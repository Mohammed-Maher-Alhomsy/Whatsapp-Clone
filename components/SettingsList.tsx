import { StyleSheet, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";

import BoxedIcon from "./BoxedIcon";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

type Props = {
  data: {
    name: string;
    icon: string;
    backgroundColor: string;
  }[];
};

const SettingsList = ({ data }: Props) => {
  return (
    <View style={defaultStyles.block}>
      <FlatList
        data={data}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
        renderItem={({ item: { icon, backgroundColor, name } }) => (
          <View style={defaultStyles.item}>
            <BoxedIcon name={icon} backgroundColor={backgroundColor} />

            <Text style={{ flex: 1, fontSize: 18 }}>{name}</Text>

            <Ionicons size={20} color={Colors.gray} name="chevron-forward" />
          </View>
        )}
      />
    </View>
  );
};

export default SettingsList;

const styles = StyleSheet.create({});
