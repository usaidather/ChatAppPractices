import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import SignInScreen from '../screens/SignInScreen'
import GroupScreen from '../screens/GroupsScreen'
import ChatScreen from '../screens/ChatScreen'

const Stack = createStackNavigator()

function MainStackNavigator() {
    return (
        <NavigationContainer >
            <Stack.Navigator>
                <Stack.Screen
                    name='SignInScreen'
                    component={SignInScreen}
                    options={{headerShown:false}}
                />
                <Stack.Screen
                    name='Groups Screen'
                    component={GroupScreen}
                    options={{ title: 'Groups' }} />
                <Stack.Screen
                    name='Chat Screen'
                    component={ChatScreen}
                    options={{ title: 'Chat' }} />
            </Stack.Navigator>
        </NavigationContainer>
        
    )
}

export default MainStackNavigator