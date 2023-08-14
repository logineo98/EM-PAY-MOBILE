import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Screens } from '../../../screens'

const HomeStack = () => {
    const stack = createNativeStackNavigator()

    return (
        <stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='home'>
            <stack.Screen name='home' component={Screens.Home.home} />
            <stack.Screen name='ika_wari_taa' component={Screens.Home.ika_wari_taa} />
            <stack.Screen name='facture' component={Screens.Home.facture} />
            <stack.Screen name='recharge' component={Screens.Home.recharge} />
        </stack.Navigator>
    )
}

const styles = StyleSheet.create({})

export default HomeStack