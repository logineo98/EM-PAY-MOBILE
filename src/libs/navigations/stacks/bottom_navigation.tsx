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
import Animated from 'react-native-reanimated'
import Entypo from 'react-native-vector-icons/Entypo'

type COMPONENT_TYPE = {
    setScreenName: React.Dispatch<React.SetStateAction<string>>,
    setBottomTabScreenName: React.Dispatch<React.SetStateAction<string>>,
    displayCard: boolean,
    route: RouteProp<ParamListBase, 'bottom'>,
}

const BottomNavigation: FC<COMPONENT_TYPE> = ({ setScreenName, setBottomTabScreenName, displayCard, route }) => {
    const BottomTab = createBottomTabNavigator()
    const [show, setShow] = useState(false);

    useEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route)

        setBottomTabScreenName(routeName as string)
    }, [route])



    return (
        <View style={{ flex: 1 }}>

            <BottomTab.Navigator screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true, tabBarStyle: { display: show ? "flex" : "none" } }} initialRouteName='home_stack'>

                <BottomTab.Screen name='home_stack' children={({ route }) => <HomeStack route={route} setScreenName={setScreenName} displayCard={displayCard} />} options={{ tabBarItemStyle: { display: 'none' } }} />

                <BottomTab.Screen name='geolocalisation_stack' component={GeolocalisationStack} options={{
                    tabBarLabelStyle: { fontFamily: roboto.regular },
                    tabBarIcon: (({ color, focused, size }) => { /*size = size - 2;*/ color = focused ? colors.fond1 : colors.black; return <MaterialCommunityIcons name='map-marker-radius-outline' color={color} size={size} /> }),
                    tabBarLabel: ({ focused, color }) => { color = focused ? colors.fond1 : colors.black; return <Text style={{ color, fontSize: 8 }}>Carte géolocalisation</Text> },
                }} />

                <BottomTab.Screen name='historique_stack' component={HistoriqueStack} options={{
                    tabBarLabelStyle: { fontFamily: roboto.regular },
                    tabBarIcon: (({ color, focused, size }) => { /*size = size - 2;*/ color = focused ? colors.fond1 : colors.black; return <MaterialCommunityIcons name='history' color={color} size={size} /> }),
                    tabBarLabel: ({ focused, color }) => { color = focused ? colors.fond1 : colors.black; return <Text style={{ color, fontSize: 8 }}>Historique</Text> },
                }} />

                <BottomTab.Screen name='service_client_stack' component={ServiceClientStack} options={{
                    tabBarLabelStyle: { fontFamily: roboto.regular },
                    tabBarIcon: (({ color, focused, size }) => { /*size = size - 2;*/ color = focused ? colors.fond1 : colors.black; return <MaterialCommunityIcons name='phone-outgoing' color={color} size={size} /> }),
                    tabBarLabel: ({ focused, color }) => { color = focused ? colors.fond1 : colors.black; return <Text style={{ color, fontSize: 8 }}>Service client</Text> },
                }} />
            </BottomTab.Navigator>
            <Animated.View style={[{ height: 40, position: "absolute", bottom: show ? 65 : 25, width: '100%', alignItems: 'center' }]}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => setShow(!show)} ><View style={{ height: 50, width: 50, borderRadius: 50, backgroundColor: 'blue', alignItems: "center", justifyContent: "center" }}><Entypo name={!show ? 'plus' : 'minus'} size={25} color={colors.white} /></View></TouchableOpacity>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({})

export default BottomNavigation