import { StyleSheet, } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from './navigation';
import AuthStack from './stacks/auth_stack';

const RootNavigation = () => {
    const root = createNativeStackNavigator();
    const host = true;

    return (
        <NavigationContainer >
            <root.Navigator screenOptions={{ headerShown: false }}>
                {host ?
                    <root.Screen name='main' component={Navigation} />
                    :
                    <root.Screen name='auth' component={AuthStack} />
                }
            </root.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})

export default RootNavigation