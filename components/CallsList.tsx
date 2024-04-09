import { TouchableOpacity, View } from "react-native";

import Animated, {
  FadeInUp,
  FadeOutUp,
  withTiming,
  SharedValue,
  CurvedTransition,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import CallsItem from "./CallsItem";
import Colors from "@/constants/Colors";
import SwipeableRow from "./SwipeableRow";
import { defaultStyles } from "@/constants/Styles";

const transition = CurvedTransition.delay(100);

type Props = {
  items: {
    id: string;
    img: string;
    name: string;
    date: string;
    video: boolean;
    missed: boolean;
    incoming: boolean;
  }[];
  editing: SharedValue<number>;
  onDelete: (id: string) => void;
};

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const CallsList = ({ items, onDelete, editing }: Props) => {
  const animatedRowStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(editing.value) }],
  }));

  return (
    <Animated.FlatList
      data={items}
      scrollEnabled={false}
      skipEnteringExitingAnimations
      itemLayoutAnimation={transition}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
      renderItem={({ item, index }) => (
        <SwipeableRow onDelete={() => onDelete(item.id)}>
          <Animated.View
            entering={FadeInUp.delay(index * 10)}
            exiting={FadeOutUp}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <AnimatedTouchableOpacity
              onPress={() => onDelete(item.id)}
              style={[animatedRowStyles, { paddingLeft: 8 }]}
            >
              <Ionicons name="remove-circle" size={24} color={Colors.red} />
            </AnimatedTouchableOpacity>

            <CallsItem
              item={{ ...item }}
              animatedRowStyles={animatedRowStyles}
            />
          </Animated.View>
        </SwipeableRow>
      )}
    />
  );
};

export default CallsList;
