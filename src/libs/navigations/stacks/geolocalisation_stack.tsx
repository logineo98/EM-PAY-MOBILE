import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Screens } from "../../../screens"

const GeolocalisationStack = () => {
    const stack = createNativeStackNavigator()

    return (
        <stack.Navigator screenOptions={{ headerShown: false }}>
            <stack.Screen name='geolocalisation' component={Screens.geolocalisation} />
        </stack.Navigator>
    )
}

export default GeolocalisationStack
