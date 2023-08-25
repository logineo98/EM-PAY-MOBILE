import { StyleSheet } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { components } from '../../components'
import { Screens } from '../../screens'
import { ParamListBase, RouteProp, getFocusedRouteNameFromRoute } from '@react-navigation/native'

type COMPONENT_TYPE = {
    route: RouteProp<ParamListBase, 'main'>
}

const Navigation: FC<COMPONENT_TYPE> = ({ route }) => {
    const Drawer = createDrawerNavigator()

    const [screenName, setScreenName] = useState('')
    const [displayCard, setDisplayCard] = useState(true)

    useEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route)

        setScreenName(routeName as string)
    }, [route])

    return (
        <Drawer.Navigator initialRouteName='bottom'
            drawerContent={({ navigation }) => <components.cards.customDrawerContent navigation={navigation} screenName={screenName} />}
            screenOptions={{
                header: ({ navigation }) => (<components.commons.header navigation={navigation} screenName={screenName} displayCard={displayCard} setDisplayCard={setDisplayCard} />),
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
            <Drawer.Screen name='geolocalisation' component={Screens.Home.geolocalisation} />
            <Drawer.Screen name='historique' component={Screens.Home.historique} />
            <Drawer.Screen name='service_client' component={Screens.Home.serviceClient} />
            {/* <Drawer.Screen name='bottom' children={({ route }) => <BottomNavigation route={route} setScreenName={setScreenName} setBottomTabScreenName={setBottomTabScreenName} displayCard={displayCard} />} /> */}
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({})

export default Navigation
