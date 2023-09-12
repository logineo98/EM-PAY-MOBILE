import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import GeolocalisationStack from './geolocalisation_stack'
import HistoriqueStack from './historique_stack'
import ServiceClientStack from './client_service_stack'
import HomeStack from './home_stack'
import { colors, roboto } from '../../typography/typography'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ParamListBase, RouteProp, getFocusedRouteNameFromRoute } from '@react-navigation/native'
import Entypo from 'react-native-vector-icons/Entypo'
import { checking } from '../../services/user/user.action'
import { useDispatch } from 'react-redux'

type COMPONENT_TYPE = {
    setScreenName: React.Dispatch<React.SetStateAction<string>>,
    setBottomTabScreenName: React.Dispatch<React.SetStateAction<string>>,
    displayCard: boolean,
    route: RouteProp<ParamListBase, 'bottom'>,
}

const BottomNavigation: FC<COMPONENT_TYPE> = ({ setScreenName, setBottomTabScreenName, displayCard, route }) => {
    const BottomTab = createBottomTabNavigator()
    const [screen, setScreen] = useState('');
    const dispatch = useDispatch<any>()
    const [show, setShow] = useState(false)

    useEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route)

        setBottomTabScreenName(routeName as string)
        setScreen(routeName as string)
    }, [route])

    useEffect(() => { dispatch(checking()) }, [screen, dispatch]);

    return (
        <View style={styles.container}>
            <BottomTab.Navigator screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true, tabBarStyle: { display: show ? 'flex' : 'none' } }} initialRouteName='home_stack'>
                <BottomTab.Screen name='home_stack' children={({ route }) => <HomeStack route={route} setScreenName={setScreenName} displayCard={displayCard} />} options={{ tabBarItemStyle: { display: 'none' } }} />

                <BottomTab.Screen name='geolocalisation_stack' component={GeolocalisationStack} options={{
                    tabBarLabelStyle: { fontFamily: roboto.regular },
                    tabBarIcon: (({ color, focused, size }) => { color = focused ? colors.fond1 : colors.black; return <MaterialCommunityIcons name='map-marker-radius-outline' size={size} color={color} /> }),
                    tabBarLabel: ({ focused, color }) => { color = focused ? colors.fond1 : colors.black; return <Text style={{ color, fontSize: 8 }}>Carte géolocalisation</Text> },
                }} />

                <BottomTab.Screen name='historique_stack' component={HistoriqueStack} options={{
                    tabBarLabelStyle: { fontFamily: roboto.regular },
                    tabBarIcon: (({ color, focused, size }) => { color = focused ? colors.fond1 : colors.black; return <MaterialCommunityIcons name='history' size={size} color={color} /> }),
                    tabBarLabel: ({ focused, color }) => { color = focused ? colors.fond1 : colors.black; return <Text style={{ color, fontSize: 8 }}>Historique</Text> },
                }} />

                <BottomTab.Screen name='service_client_stack' component={ServiceClientStack} options={{
                    tabBarLabelStyle: { fontFamily: roboto.regular },
                    tabBarIcon: (({ color, focused, size }) => { color = focused ? colors.fond1 : colors.black; return <MaterialCommunityIcons name='phone-outgoing' size={size} color={color} /> }),
                    tabBarLabel: ({ focused, color }) => { color = focused ? colors.fond1 : colors.black; return <Text style={{ color, fontSize: 8 }}>Service client</Text> },
                }} />
            </BottomTab.Navigator>

            <View style={[styles.plus_minus_container, { bottom: show ? 53 : 0, }]}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => setShow(!show)} style={styles.plus_minus_icon_container}>
                    <Entypo name={!show ? 'plus' : 'minus'} size={25} color={colors.white} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, },

    plus_minus_container: { height: 50, width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'center', },
    plus_minus_icon_container: { backgroundColor: colors.tz_blue, height: 40, width: 40, borderRadius: 40, alignItems: 'center', justifyContent: 'center', },
})

export default BottomNavigation