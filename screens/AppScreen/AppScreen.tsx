import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {STACK_SCREEN} from "../../navigation/AppStackNavigation";

const AppScreen =() => {
    const navigation = useNavigation();

    const handleNavigation = (screen:string) => {
        if(screen === STACK_SCREEN.TAB_ANIMATION) {
            // @ts-ignore
            navigation.navigate(STACK_SCREEN.TAB_ANIMATION)
        }
    }
    return (
        <View style={Styles.container}>
            <TouchableOpacity onPress={() =>handleNavigation(STACK_SCREEN.TAB_ANIMATION)}>
                <Text>{STACK_SCREEN.TAB_ANIMATION}</Text>
            </TouchableOpacity>
        </View>
    )
}
const Styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default AppScreen;
