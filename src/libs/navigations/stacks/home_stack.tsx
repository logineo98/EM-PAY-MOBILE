import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Screens } from '../../../screens'

const HomeStack = () => {
    const stack = createNativeStackNavigator()

    return (
        <stack.Navigator screenOptions={{ headerShown: true }}>
            <stack.Screen name='ika_wari_taa' component={Screens.Others.ika_wari_taa} />
            <stack.Screen name='facture' component={Screens.Others.facture} />
            <stack.Screen name='recharge' component={Screens.Others.recharge} />


        </stack.Navigator>
    )
}

export default HomeStack

const styles = StyleSheet.create({})