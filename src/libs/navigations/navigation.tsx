import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import BottomNavigation from './stacks/bottom_navigation'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { components } from '../../components'

const Navigation = () => {
    const Drawer = createDrawerNavigator()

    const [screenName, setScreenName] = useState('')
    const [bottomTabScreenName, setBottomTabScreenName] = useState('')
    const [displayCard, setDisplayCard] = useState(true)

    return (
        <Drawer.Navigator initialRouteName='bottom'
            drawerContent={({ navigation }) => <components.cards.customDrawerContent navigation={navigation} screenName={screenName} />}
            screenOptions={{
                header: ({ navigation }) => (<components.commons.header navigation={navigation} screenName={screenName} bottomTabScreenName={bottomTabScreenName} displayCard={displayCard} setDisplayCard={setDisplayCard} />),
                swipeEnabled: false
            }}
        >
            <Drawer.Screen name='bottom' children={({ route }) => <BottomNavigation route={route} setScreenName={setScreenName} setBottomTabScreenName={setBottomTabScreenName} displayCard={displayCard} />} />
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({})

export default Navigation
