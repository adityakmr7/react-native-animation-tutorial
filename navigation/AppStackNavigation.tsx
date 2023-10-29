import React from "react";
import {NavigationContainer, RouteProp} from "@react-navigation/native";
import createStackNavigator from "react-native-screens/createNativeStackNavigator";
import TabAnimation from "../components/tabAnimation";
import {createNativeStackNavigator, NativeStackNavigationProp} from "@react-navigation/native-stack";
import AppScreen from "../screens/AppScreen/AppScreen";
export const STACK_SCREEN = {
    APP_SCREEN:'APP_SCREEN',
    TAB_ANIMATION:'TAB_ANIMATION'
}



const Stack = createNativeStackNavigator();

const AppStackNavigation = () =>{
    return(
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name={STACK_SCREEN.APP_SCREEN} component={AppScreen}/>
            <Stack.Screen name={STACK_SCREEN.TAB_ANIMATION} component={TabAnimation}/>
        </Stack.Navigator>
    </NavigationContainer>
    )
}


export default AppStackNavigation;
