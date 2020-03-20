import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import SignInScreen from '../screens/SignInScreen'
import GroupScreens from '../screens/GroupsScreen'

const Stack = createStackNavigator()

function MainStackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='SignInScreen'
                    component={SignInScreen} />
                <Stack.Screen
                    name='GroupsScreen'
                    component={GroupsScreen}
                    options={{ title: 'Groups' }} />
                <Stack.Screen
                    name='GroupsScreen'
                    component={GroupsScreen}
                    options={{ title: 'Chat' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStackNavigator