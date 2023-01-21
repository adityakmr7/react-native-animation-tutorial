import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useRef } from "react";
import BottomSheet from "./BottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const BottomSheetContainer = () => {
  const ref = useRef(null);
  const onPress = useCallback(() => {
    if (ref?.current?.isActive()) {
      ref?.current?.scrollToPosition(0);
    } else {
      ref?.current?.scrollToPosition(-300);
    }
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          paddingVertical: 40,
          marginTop: 40,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "cyan",
        }}
      >
        <Text>Click Me</Text>
      </TouchableOpacity>
      <BottomSheet ref={ref} />
    </GestureHandlerRootView>
  );
};

export default BottomSheetContainer;
