import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Screens } from '../../../screens'
import { StyleSheet } from 'react-native'

const GeolocalisationStack = () => {
    const stack = createNativeStackNavigator()

    return (
        <stack.Navigator screenOptions={{ headerShown: false }}>
            <stack.Screen name='geolocalisation' component={Screens.geolocalisation} />
        </stack.Navigator>
    )
}

const styles = StyleSheet.create({})

export default GeolocalisationStack
