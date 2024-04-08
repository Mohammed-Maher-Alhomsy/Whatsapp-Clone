import { View } from "react-native";

import Animated, {
  FadeInUp,
  FadeOutUp,
  CurvedTransition,
} from "react-native-reanimated";

import CallsItem from "./CallsItem";
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
  onDelete: (id: string) => void;
};

const CallsList = ({ items, onDelete }: Props) => {
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
          >
            <CallsItem {...item} />
          </Animated.View>
        </SwipeableRow>
      )}
    />
  );
};

export default CallsList;
