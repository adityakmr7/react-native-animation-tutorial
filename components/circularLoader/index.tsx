import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const CIRCLE_LENGTH = 1000; // 2* Math.PI * R
const R = CIRCLE_LENGTH / (2 * Math.PI);

const STROKE_BACKGROUND_COLOR = "#CEF4F4";
const STROKE_COLOR = "#9F9AF9";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(TextInput);

const ReText = ({ style = {}, text }: { text: any; style: any }) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      text: text.value,
    };
  });
  return (
    <AnimatedText
      editable={false}
      {...{ animatedProps }}
      value={text.value}
      style={style}
    />
  );
};

const CircularLoader = () => {
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
    };
  });

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)} %`;
  });
  const handleAnimation = () => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 5000 });
  };

  return (
    <View style={styles.container}>
      <ReText
        style={{ fontSize: 60, color: STROKE_COLOR }}
        text={progressText}
      />
      <Svg style={{ position: "absolute" }}>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={STROKE_BACKGROUND_COLOR}
          strokeWidth={20}
        />
        <AnimatedCircle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={STROKE_COLOR}
          strokeWidth={20}
          strokeLinecap="round"
          strokeDasharray={`${CIRCLE_LENGTH} ${CIRCLE_LENGTH}`}
          {...{ animatedProps }}
        />
      </Svg>
      <TouchableOpacity style={{ marginBottom: 200 }} onPress={handleAnimation}>
        <Text>Press Me</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default CircularLoader;
