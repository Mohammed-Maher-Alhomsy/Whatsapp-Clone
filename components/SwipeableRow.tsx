import React, { useRef } from "react";
import { Animated, StyleSheet, View, Text } from "react-native";

import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

type Props = {
  onDelete: () => void;
  children: React.ReactNode;
};

const SwipeableRow = ({ children, onDelete }: Props) => {
  const swipeableRowRef = useRef(null);

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragAnimatedValue: Animated.AnimatedInterpolation<number>
  ) => (
    <View style={{ width: 300, flexDirection: "row" }}>
      {renderRightAction("Delete", "#dd2c00", 300, progress)}
    </View>
  );

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
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const close = () => {
    // @ts-ignore
    swipeableRowRef.current?.close();
    onDelete();
  };

  const onSwipeableOpen = () => {
    close();
  };

  return (
    <Swipeable
      ref={swipeableRowRef}
      enableTrackpadTwoFingerGesture
      friction={1.4}
      overshootRight={false}
      rightThreshold={140}
      renderRightActions={renderRightActions}
      onSwipeableOpen={onSwipeableOpen}
    >
      {children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  actionText: {
    padding: 10,
    fontSize: 16,
    color: "white",
    alignSelf: "flex-start",
    backgroundColor: "transparent",
  },

  rightAction: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SwipeableRow;
