import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Screens } from '../../../screens'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeStack = ({ navigation, route }: any) => {
    const stack = createNativeStackNavigator()

    const [screen, setScreen] = useState('')

    useEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route)
        routeName && setScreen(routeName)
    }, [route])

    useEffect(() => {
        (async () => {
            try { await AsyncStorage.setItem('route_name', screen) }
            catch (error: any) { }
        })()
    }, [screen])

    console.log(screen)

    return (
        <stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='home'>
            <stack.Screen name='home' component={Screens.Home.home} />
            <stack.Screen name='ika_wari_taa' component={Screens.Home.ika_wari_taa} />
            <stack.Screen name='facture' component={Screens.Home.facture} />
            <stack.Screen name='recharge' component={Screens.Home.recharge} />
            <stack.Screen name='partenaire' component={Screens.Home.partenaire} />
            <stack.Screen name='a_propos' component={Screens.Home.a_propos} />
            <stack.Screen name='tarif' component={Screens.Home.tarif} />
            <stack.Screen name='status' component={Screens.Home.status} />
        </stack.Navigator>
    )
}

const styles = StyleSheet.create({})

export default HomeStack