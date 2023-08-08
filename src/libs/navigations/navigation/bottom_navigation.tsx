import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import GeolocalisationStack from '../stacks/geolocalisation_stack'
import HistoriqueStack from '../stacks/historique_stack'
import ServiceClientStack from '../stacks/client_service_stack'

const BottomNavigation = () => {
    const stack = createNativeStackNavigator()

    return (
        <stack.Navigator screenOptions={{ headerShown: true }}>
            <stack.Screen name='geolocalisation_stack' component={GeolocalisationStack} />
            <stack.Screen name='historique_stack' component={HistoriqueStack} />
            <stack.Screen name='service_client_stack' component={ServiceClientStack} />
        </stack.Navigator>
    )
}

export default BottomNavigation

const styles = StyleSheet.create({})