import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Screens } from "../../../screens"

const AuthStack = () => {
    const stack = createNativeStackNavigator()

    return (
        <stack.Navigator initialRouteName="welcome" screenOptions={{ headerShown: false, }} >
            {routes?.map(item => (<stack.Screen key={item.route} name={item.route} component={item.component} options={{ animation: "slide_from_right" }} />))}
        </stack.Navigator>
    )
}

export default AuthStack


const routes = [
    { route: 'welcome', component: Screens.Auth.welcome, icon: '' },
    { route: 'login', component: Screens.Auth.login, icon: '' },
    { route: 'forgot', component: Screens.Auth.forgot, icon: '' },
    { route: 'forgot_verify', component: Screens.Auth.verify, icon: '' },
    { route: 'reset_password', component: Screens.Auth.reset, icon: '' },
    { route: 'register', component: Screens.Auth.infos, icon: '' },

    { route: 'account', component: Screens.Auth.account, anim: 'slide_from_right' },
    { route: 'activation', component: Screens.Auth.activation, anim: 'slide_from_right' },
    { route: 'signature', component: Screens.Auth.signature, anim: 'slide_from_right' },
    { route: 'photo', component: Screens.Auth.photo, anim: 'slide_from_right' },
    { route: 'finalisation', component: Screens.Auth.finalisation, anim: 'slide_from_right' },
    { route: 'document', component: Screens.Auth.document, anim: 'slide_from_right' },
]