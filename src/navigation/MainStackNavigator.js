import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import SignInScreen from '../screens/SignInScreen'
import GroupScreen from '../screens/GroupsScreen'
import ChatScreen from '../screens/ChatScreen'
import firebase from '../firebase/Firebase'

const Stack = createStackNavigator()

function UserStackNavigator() {
    return (
        <Stack.Navigator name="SignIn">
            <Stack.Screen
                name='SignInScreen'
                component={SignInScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

function MainStackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator name="Chat">

                {firebase.auth().currentUser ? (
                    <>
                        <Stack.Screen name="User" component={UserStackNavigator} options={{ headerShown: false }} />
                    </>
                ) : (
                        <>
                            <Stack.Screen
                                name='Groups Screen'
                                component={GroupScreen}
                                options={{ title: 'Groups' }} />
                            <Stack.Screen
                                name='Chat Screen'
                                component={ChatScreen}
                                options={{ title: 'Chat' }} />
                        </>
                    )}
            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default MainStackNavigator