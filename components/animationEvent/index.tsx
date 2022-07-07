import React from 'react'
import { View,Text, StyleSheet } from 'react-native'

function AnimationEvent() {
  return (
    <View style={styles.container}>
        <Text>Hello world</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        display:'flex',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
export default AnimationEvent