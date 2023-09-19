import { StyleSheet } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { components } from '../../components'
import { Screens } from '../../screens'
import { ParamListBase, RouteProp, getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { checking, getAllusers } from '../services/user/user.action'
import { getAllPartners } from '../services/partner/partner.action'
import { getAllTarifs } from '../services/tarif/tarif.action'

type COMPONENT_TYPE = {
    route: RouteProp<ParamListBase, 'main'>
}

const Navigation: FC<COMPONENT_TYPE> = ({ route }) => {
    const Drawer = createDrawerNavigator()
    const dispatch = useDispatch<any>()
    const [screenName, setScreenName] = useState('')
    const [displayCard, setDisplayCard] = useState(true)

    useEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route)
        setScreenName(routeName as string)
    }, [route])

    useEffect(() => {
        dispatch(checking())
        if (screenName !== 'ika_wari_taa' && screenName !== 'ika_wari_taa_status') { dispatch(getAllusers()) }

        if (screenName === undefined || screenName === 'partenaire' || screenName === 'home') dispatch(getAllPartners())
        if (screenName === 'tarif') dispatch(getAllTarifs())
    }, [screenName, dispatch])

    return (
        <Drawer.Navigator initialRouteName='bottom'
            drawerContent={({ navigation }) => <components.cards.customDrawerContent navigation={navigation} screenName={screenName} />}
            screenOptions={{
                header: ({ navigation }) => (<components.commons.header navigation={navigation} screenName={screenName} displayCard={displayCard} setDisplayCard={setDisplayCard} />),
                swipeEnabled: false
            }}
        >
            <Drawer.Screen name='home' children={({ navigation }) => <Screens.Home.home navigation={navigation} displayCard={displayCard} />} />
            <Drawer.Screen name='ika_wari_taa' children={({ navigation }) => <Screens.Home.ika_wari_taa navigation={navigation} screenName={screenName} />} />
            <Drawer.Screen name='ika_wari_taa_status' component={Screens.Home.ika_wari_taa_status} />
            <Drawer.Screen name='facture' component={Screens.Home.facture} />
            <Drawer.Screen name='recharge' component={Screens.Home.recharge} />
            <Drawer.Screen name='partenaire' component={Screens.Home.partenaire} />
            <Drawer.Screen name='a_propos' component={Screens.Home.a_propos} />
            <Drawer.Screen name='tarif' component={Screens.Home.tarif} />
            <Drawer.Screen name='status' children={({ }) => <Screens.Home.status screenName={screenName} />} />
            <Drawer.Screen name='geolocalisation' children={({ }) => <Screens.Home.geolocalisation screenName={screenName} />} />
            <Drawer.Screen name='historique' component={Screens.Home.historique} />
            <Drawer.Screen name='service_client' component={Screens.Home.serviceClient} />
            {/* <Drawer.Screen name='bottom' children={({ route }) => <BottomNavigation route={route} setScreenName={setScreenName} setBottomTabScreenName={setBottomTabScreenName} displayCard={displayCard} />} /> */}
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({})

export default Navigation
