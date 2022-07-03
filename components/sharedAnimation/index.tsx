import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
const SIZE = 100;
function SharedAnimation() {
  const progress = useSharedValue(1);

  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [{ rotate: `${progress.value * Math.PI * 2}rad` }],
    };
  }, []);

  useEffect(() => {
    progress.value = withRepeat(withTiming(0.5, { duration: 5000 }), -1, true);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.View style={[styles.box, rStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "red",
  },
});

export default SharedAnimation;
