import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Screens } from "../../../screens"

const AuthStack = () => {
    const stack = createNativeStackNavigator()

    return (
        <stack.Navigator initialRouteName="welcome" screenOptions={{ headerShown: false }}>
            {routes?.map(item => (<stack.Screen key={item.route} name={item.route} component={item.component} />))}
        </stack.Navigator>
    )
}

export default AuthStack


const routes = [
    { route: 'welcome', component: Screens.Auth.welcome, icon: '' },
    { route: 'login', component: Screens.Auth.login, icon: '' },
    { route: 'register', component: Screens.Auth.inscription, icon: '' },
]