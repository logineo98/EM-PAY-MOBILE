import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomNavigation from './navigation/bottom_navigation'
import SideNavigation from './navigation/side_navigation'

const Navigation = () => {
    const stack = createNativeStackNavigator()

    return (
        <stack.Navigator screenOptions={{ headerShown: true }}>
            <stack.Screen name='side' component={SideNavigation} />
            <stack.Screen name='bottom' component={BottomNavigation} />
        </stack.Navigator>
    )
}

export default Navigation

const styles = StyleSheet.create({})