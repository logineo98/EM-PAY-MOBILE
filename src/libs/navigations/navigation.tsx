import { StyleSheet } from 'react-native'
import React from 'react'
import BottomNavigation from './navigation/bottom_navigation'
import SideNavigation from './navigation/side_navigation'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { components } from '../../components'
import { width } from '../typography/typography'

const Navigation = () => {
    const Drawer = createDrawerNavigator()

    return (
        <Drawer.Navigator initialRouteName='bottom'
            drawerContent={({ navigation }) => <components.cards.customDrawerContent navigation={navigation} />}
            screenOptions={{
                header: ({ navigation }) => (<components.commons.header navigation={navigation} />),
                drawerPosition: 'left',
                swipeEdgeWidth: width / 2,
            }}
        >
            <Drawer.Screen name='bottom' component={BottomNavigation} />
            <Drawer.Screen name='side' component={SideNavigation} />
        </Drawer.Navigator>
    )
}

export default Navigation

const styles = StyleSheet.create({})