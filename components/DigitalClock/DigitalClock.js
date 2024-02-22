import {Text, View,StyleSheet} from "react-native";
import {useEffect, useState} from "react";
import Animated, {SlideInUp, SlideOutDown, withTiming} from "react-native-reanimated";

const animationDistance  = 150;
const animationDuration = 300;
const DigitalClock  = () => {
    const [currentTime,setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        },1000);
        return () => clearInterval(intervalId);
    },[])

    const formattedTime = currentTime.toLocaleTimeString([], {timeStyle:'medium'});
    const [h,m,s] = formattedTime.split(/:| /);

    const entering = (values) => {
        'worklet'
        const animations = {
            originY:withTiming(values.targetOriginY, {duration:300})
        }
        const initialValues = {
            originY:values.targetOriginY -150
        }
        return {
            initialValues,
            animations
        }

    }
    const exiting = (values) => {
        'worklet'
        const animations = {
            originY:withTiming(values.currentOriginY + animationDistance, {duration:animationDuration})
        }
        const initialValues = {
            originY:values.currentOriginY
        }
        return {
            initialValues,
            animations
        }

    }
    return (
        <View style={styles.container}>
            <View style={styles.clockContainer}>
                <Animated.Text key={h} entering={entering} exiting={exiting} style={styles.text}>{h} :</Animated.Text>
                <Animated.Text key={m} entering={entering} exiting={exiting} style={styles.text} >{m} :</Animated.Text>
                <Animated.Text key={s} entering={entering} exiting={exiting} style={styles.text}>{s}</Animated.Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    clockContainer: {
        padding:32,
        flexDirection:'row',
        overflow:'hidden',
        backgroundColor:'#050301',
        borderRadius:16,
    },
    text: {
        fontSize: 48,
        fontWeight: 'bold',
        width:100,
        textAlign:'center',
        color:'white'
    }
})


export default DigitalClock;
