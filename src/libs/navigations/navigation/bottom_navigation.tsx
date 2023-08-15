import { StyleSheet, Text, } from 'react-native'
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
                tabBarLabelStyle: { fontFamily: roboto.regular },
                tabBarIcon: (({ color, focused, size }) => { /*size = size - 2;*/ color = focused ? colors.fond1 : colors.black; return <MaterialCommunityIcons name='map-marker-radius-outline' color={color} size={size} /> }),
                tabBarLabel: ({ focused, color }) => { color = focused ? colors.fond1 : colors.black; return <Text style={{ color, fontSize: 10 }}>Carte géolocalisation</Text> },
            }} />

            <BottomTab.Screen name='historique_stack' component={HistoriqueStack} options={{
                tabBarLabelStyle: { fontFamily: roboto.regular },
                tabBarIcon: (({ color, focused, size }) => { /*size = size - 2;*/ color = focused ? colors.fond1 : colors.black; return <MaterialCommunityIcons name='history' color={color} size={size} /> }),
                tabBarLabel: ({ focused, color }) => { color = focused ? colors.fond1 : colors.black; return <Text style={{ color, fontSize: 10 }}>Historique</Text> },
            }} />

            <BottomTab.Screen name='service_client_stack' component={ServiceClientStack} options={{
                tabBarLabelStyle: { fontFamily: roboto.regular },
                tabBarIcon: (({ color, focused, size }) => { /*size = size - 2;*/ color = focused ? colors.fond1 : colors.black; return <MaterialCommunityIcons name='phone-outgoing' color={color} size={size} /> }),
                tabBarLabel: ({ focused, color }) => { color = focused ? colors.fond1 : colors.black; return <Text style={{ color, fontSize: 10 }}>Service client</Text> },
            }} />

        </BottomTab.Navigator>
    )
}

const styles = StyleSheet.create({})

export default BottomNavigation