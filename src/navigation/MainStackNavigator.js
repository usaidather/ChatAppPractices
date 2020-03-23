import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import SignInScreen from '../screens/SignInScreen'
import GroupScreen from '../screens/GroupsScreen'
import ChatScreen from '../screens/ChatScreen'
import AddGroupScreen from '../screens/AddGroupsScreen'
import firebase from '../firebase/Firebase'
import AsyncStorage from '@react-native-community/async-storage';

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

function UserFlow() {
    console.log(firebase.auth().currentUser)
    const user = firebase.auth().currentUser
    return (
        <NavigationContainer>
            <Stack.Navigator name="chat">

                <Stack.Screen
                    name='SignInScreen'
                    component={SignInScreen}
                    options={{ headerShown: false }}
                />

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
            </Stack.Navigator>
        </NavigationContainer>
    )
}

function SignInFlow() {
    console.log(firebase.auth().currentUser)
    const user = firebase.auth().currentUser
    return (
        <NavigationContainer>
            <Stack.Navigator name="chat">
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
            </Stack.Navigator>
        </NavigationContainer>
    )
}

// getData = async () => {
//     try {
//         const value = await AsyncStorage.getItem('@isLoggedIn')
//         if (value !== null) {
//             return value
//         }
//     } catch (e) {
//         return null

//     }
//     return value
// }

const getUserId = async () => {
    let userId = '';
    try {
      userId = await AsyncStorage.getItem('isLoggedIn') ;
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    return userId;
  }

function MainStackNavigator() {
    // console.log(firebase.auth().currentUser)
    const user = firebase.auth().currentUser
    // const data = getData()
    // console.log(data)
    console.log(getUserId())

    return (
        !getUserId()  ?  SignInFlow() : UserFlow()
        // SignInFlow()        
         // <NavigationContainer>
        //     <Stack.Navigator name="chat">

        //         <Stack.Screen
        //             name='SignInScreen'
        //             component={SignInScreen}
        //             options={{ headerShown: false }}
        //         />

        //         <Stack.Screen
        //             name='Groups Screen'
        //             component={GroupScreen}
        //             options={{ title: 'Groups' }} />
        //         <Stack.Screen
        //             name='Add Group Screen'
        //             component={AddGroupScreen}
        //             options={{ title: 'Chat' }} />
        //         <Stack.Screen
        //             name='Chat Screen'
        //             component={ChatScreen}
        //             options={{ title: 'Chat' }} />
        //     </Stack.Navigator>
        // </NavigationContainer>

        // <NavigationContainer>
        //     <Stack.Navigator name="Chat"
        //         screenOptions={{
        //             headerStyle: {
        //                 backgroundColor: Color.uastudiosGreen,
        //             },
        //             headerTintColor: '#fff',
        //             headerTitleStyle: {
        //                 fontWeight: 'bold',
        //             },
        //         }}
        //     >

        //         {/* {firebase.auth().currentUser == null ? ( */}
        //             <>
        //                 <Stack.Screen
        //                     name='SignInScreen'
        //                     component={SignInScreen}
        //                     options={{ headerShown: false }}
        //                 />
        //                 {/* <Stack.Screen name="User" component={UserStackNavigator} options={{ headerShown: false }} /> */}
        //             </>
        //         {/* ) : ( */}
        //                 <>
        //                     <Stack.Screen
        //                         name='Groups Screen'
        //                         component={GroupScreen}
        //                         options={{ title: 'Groups' }} />
        //                     <Stack.Screen
        //                         name='Add Group Screen'
        //                         component={AddGroupScreen}
        //                         options={{ title: 'Chat' }} />
        //                     <Stack.Screen
        //                         name='Chat Screen'
        //                         component={ChatScreen}
        //                         options={{ title: 'Chat' }} />
        //                 </>
        //             {/* )} */}
        //     </Stack.Navigator>
        // </NavigationContainer>

    )
}

export default MainStackNavigator