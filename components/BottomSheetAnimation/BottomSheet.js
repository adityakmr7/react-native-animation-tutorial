import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useCallback, useEffect, useImperativeHandle } from "react";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
const BottomSheet = React.forwardRef(({}, ref) => {
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });
  const isOpen = useSharedValue(false);

  const scrollToPosition = useCallback((destination) => {
    "worklet";
    if (destination === 0) {
      isOpen.value = false;
    } else {
      isOpen.value = true;
    }
    translateY.value = withSpring(destination, { damping: 50 });
  }, []);

  const isActive = useCallback(() => {
    return isOpen.value;
  }, []);
  useImperativeHandle(
    ref,
    () => ({
      scrollToPosition,
      isActive,
    }),
    [scrollToPosition, isActive]
  );
  const handleGesture = Gesture.Pan()
    .onStart((event) => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 3) {
        scrollToPosition(0);
      } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
        scrollToPosition(-SCREEN_HEIGHT + 50);
      }
    });
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={handleGesture}>
      <Animated.View style={[styles.bottomSheetWrapper, rStyle]}>
        <View style={styles.notch} />
      </Animated.View>
    </GestureDetector>
  );
});

const styles = StyleSheet.create({
  bottomSheetWrapper: {
    position: "absolute",
    backgroundColor: "black",
    height: SCREEN_HEIGHT,
    top: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  notch: {
    width: 70,
    height: 4,
    backgroundColor: "white",
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: 2,
  },
});
export default BottomSheet;
