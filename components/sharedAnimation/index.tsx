import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, View,Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
const SIZE = 100;
function SharedAnimation() {
  const progress = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateXSpring = useSharedValue(0);
  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: SIZE  *  translateX.value,
      transform: [
        {
          translateX: translateX.value
        }
      ],
    };
  }, []);
  const rStyleSpring = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX:  translateXSpring.value
        }
      ]
    }
  })

    // withDecay
    // withSpring
    // withTiming

    const _handleAnimation = () => {
      progress.value = withRepeat(withTiming(0.5, { duration: 5000 }), -1, true);
      translateX.value = withTiming(300, {duration: 5000, easing: Easing.out(Easing.exp)}, (finished) => {
        if(finished) {
          console.log("Animation ENDED")
        }else {
          console.log("ANimation Canceled")
        }
      })
      translateXSpring.value = withSequence( 
        withSpring(300),
        withSpring(0)
      
      )
    }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.View style={[styles.box, rStyle]} />
      <Animated.View style={[styles.box, rStyleSpring]} />
      <View>
        <TouchableOpacity onPress={_handleAnimation}>
<Text>Start Animation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 200,
    marginHorizontal:10,
  },
  box: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "red",
    marginVertical:20,
  },
});

export default SharedAnimation;
