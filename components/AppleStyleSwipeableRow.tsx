import React, { useRef } from "react";
import { Animated, StyleSheet, Text, View, I18nManager } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

import Colors from "@/constants/Colors";

type Props = {
  children: React.ReactNode;
};

const AppleStyleSwipeableRow = ({ children }: Props) => {
  const swipeableRow = useRef(null);

  const renderRightAction = (
    text: string,
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation<number>
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    const pressHandler = () => {
      close();
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}
        >
          <Ionicons
            size={24}
            color="#fff"
            style={{ paddingTop: 10 }}
            name={text === "More" ? "ellipsis-horizontal" : "archive"}
          />
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>
  ) => (
    <View
      style={{
        width: 192,
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
      }}
    >
      {renderRightAction("More", "#C8C7CD", 192, progress)}
      {renderRightAction("Archive", Colors.muted, 128, progress)}
    </View>
  );

  const updateRef = (ref: any) => {
    swipeableRow.current = ref;
  };

  const close = () => {
    // @ts-ignore
    swipeableRow.current?.close();
  };

  return (
    <Swipeable
      ref={updateRef}
      friction={2}
      rightThreshold={40}
      enableTrackpadTwoFingerGesture
      renderRightActions={renderRightActions}
    >
      {children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: "#497AFC",
    justifyContent: "center",
  },

  actionText: {
    padding: 10,
    fontSize: 16,
    color: "white",
    backgroundColor: "transparent",
  },

  rightAction: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AppleStyleSwipeableRow;
