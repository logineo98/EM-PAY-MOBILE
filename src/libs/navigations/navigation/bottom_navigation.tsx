import { StyleSheet, } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import GeolocalisationStack from '../stacks/geolocalisation_stack'
import HistoriqueStack from '../stacks/historique_stack'
import ServiceClientStack from '../stacks/client_service_stack'
import HomeStack from '../stacks/home_stack'
import { colors, roboto } from '../../typography/typography'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const BottomNavigation = () => {
    const BottomTab = createBottomTabNavigator()

    return (
        <BottomTab.Navigator screenOptions={{ headerShown: false }} initialRouteName='home_stack'>
            <BottomTab.Screen name='home_stack' component={HomeStack} options={{ tabBarItemStyle: { display: 'none' } }} />

            <BottomTab.Screen name='geolocalisation_stack' component={GeolocalisationStack} options={{
                title: 'Carte géolocalisation',
                tabBarLabelStyle: { fontFamily: roboto.regular },
                tabBarIcon: (({ color, focused, size }) => { color = focused ? colors.fond1 : colors.black; return <MaterialCommunityIcons name='map-marker-radius-outline' color={color} /> })
            }} />

            <BottomTab.Screen name='historique_stack' component={HistoriqueStack} options={{
                title: 'Historique',
                tabBarLabelStyle: { fontFamily: roboto.regular },
                tabBarIcon: (({ color, focused, size }) => { color = focused ? colors.fond1 : colors.black; return <MaterialCommunityIcons name='history' color={color} /> })
            }} />

            <BottomTab.Screen name='service_client_stack' component={ServiceClientStack} options={{
                title: 'Service client',
                tabBarLabelStyle: { fontFamily: roboto.regular },
                tabBarIcon: (({ color, focused, size }) => { color = focused ? colors.fond1 : colors.black; return <MaterialCommunityIcons name='phone-outgoing' color={color} /> })
            }} />

        </BottomTab.Navigator>
    )
}

const styles = StyleSheet.create({})

export default BottomNavigation