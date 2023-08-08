import { StyleSheet, Text, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import { Screens } from '../../../screens';

const SideNavigation = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator initialRouteName="home">
            <Drawer.Screen name="home" component={Screens.Others.home} />
            <Drawer.Screen name="homes" component={Screens.Others.home} />

        </Drawer.Navigator>
    )
}

export default SideNavigation

const styles = StyleSheet.create({})