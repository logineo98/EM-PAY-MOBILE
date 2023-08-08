import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Screens } from "../../../screens"

const AuthStack = () => {
    const stack = createNativeStackNavigator()

    return (
        <stack.Navigator screenOptions={{ headerShown: true }}>
            <stack.Screen name='login' component={Screens.Auth.login} />
        </stack.Navigator>
    )
}

export default AuthStack
