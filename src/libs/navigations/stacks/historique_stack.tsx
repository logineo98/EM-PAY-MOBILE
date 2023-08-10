import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Screens } from '../../../screens'

const HistoriqueStack = () => {
    const stack = createNativeStackNavigator()

    return (
        <stack.Navigator screenOptions={{ headerShown: false }}>
            <stack.Screen name='historique' component={Screens.historique} />
        </stack.Navigator>
    )
}

export default HistoriqueStack

const styles = StyleSheet.create({})