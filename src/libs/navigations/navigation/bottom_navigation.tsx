import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GeolocalisationStack from '../stacks/geolocalisation_stack'
import HistoriqueStack from '../stacks/historique_stack'
import ServiceClientStack from '../stacks/client_service_stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const BottomNavigation = () => {
    const tb = createBottomTabNavigator()

    return (
        <tb.Navigator screenOptions={{ headerShown: false }}>
            <tb.Screen name='geolocalisation_stack' component={GeolocalisationStack} />
            <tb.Screen name='historique_stack' component={HistoriqueStack} />
            <tb.Screen name='service_client_stack' component={ServiceClientStack} />
        </tb.Navigator>
    )
}

export default BottomNavigation

const styles = StyleSheet.create({})