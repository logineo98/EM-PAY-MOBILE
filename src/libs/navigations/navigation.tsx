import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import BottomNavigation from './stacks/bottom_navigation'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { components } from '../../components'
import { Screens } from '../../screens'

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
            <Drawer.Screen name='home' children={({ navigation }) => <Screens.Home.home navigation={navigation} displayCard={displayCard} />} />
            <Drawer.Screen name='ika_wari_taa' component={Screens.Home.ika_wari_taa} />
            <Drawer.Screen name='facture' component={Screens.Home.facture} />
            <Drawer.Screen name='recharge' component={Screens.Home.recharge} />
            <Drawer.Screen name='partenaire' component={Screens.Home.partenaire} />
            <Drawer.Screen name='a_propos' component={Screens.Home.a_propos} />
            <Drawer.Screen name='tarif' component={Screens.Home.tarif} />
            <Drawer.Screen name='status' component={Screens.Home.status} />
            {/* <Drawer.Screen name='bottom' children={({ route }) => <BottomNavigation route={route} setScreenName={setScreenName} setBottomTabScreenName={setBottomTabScreenName} displayCard={displayCard} />} /> */}
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({})

export default Navigation
