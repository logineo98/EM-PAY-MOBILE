import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Screens } from "../../../screens"

const ServiceClientStack = () => {
    const stack = createNativeStackNavigator()

    return (
        <stack.Navigator screenOptions={{ headerShown: false }}>
            <stack.Screen name='service_client' component={Screens.serviceClient} />
        </stack.Navigator>
    )
}

export default ServiceClientStack
