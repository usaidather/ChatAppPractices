import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import SignInScreen from '../screens/SignInScreen'
import GroupScreen from '../screens/GroupsScreen'
import ChatScreen from '../screens/ChatScreen'
import AddGroupScreen from '../screens/AddGroupsScreen'
import firebase from '../firebase/Firebase'
import Color from '../utils/colors'

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
            <Stack.Navigator name="Chat"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: Color.uastudiosGreen,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            >

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
                                name='Add Group Screen'
                                component={AddGroupScreen}
                                options={{ title: 'Chat' }} />
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