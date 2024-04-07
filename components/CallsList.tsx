import { View } from "react-native";

import Animated, {
  FadeInUp,
  FadeOutUp,
  CurvedTransition,
} from "react-native-reanimated";

import CallsItem from "./CallsItem";
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
};

const CallsList = ({ items }: Props) => {
  return (
    <Animated.FlatList
      data={items}
      scrollEnabled={false}
      skipEnteringExitingAnimations
      itemLayoutAnimation={transition}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
      renderItem={({ item, index }) => (
        <Animated.View
          entering={FadeInUp.delay(index * 10)}
          exiting={FadeOutUp}
        >
          <CallsItem {...item} />
        </Animated.View>
      )}
    />
  );
};

export default CallsList;
