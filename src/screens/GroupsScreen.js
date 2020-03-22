import React, { useLayoutEffect } from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import ButtonWithIcon from '../components/ButtonWithBackground'
import images from '../const/Images'
import Strings from '../const/String'
import firebase from '../firebase/Firebase'


function GroupsScreen({ navigation }) {

  function showAddNewGroupAlert() {
    Alert.prompt(
      Strings.CreateGroup,
      Strings.EnterYourGroupname,
      [
        {
          text: Strings.Cancel,
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: Strings.Ok,
          onPress: groupName => console.log("OK Pressed, password: " + groupName)
        }
      ],
    );
  }

  logout = async () => {
    try {
        await firebase.auth().signOut();
    } catch (e) {
        console.log(e);
    }
}

  // function logout() {
  //   firebase.auth().signOut().then(user => {
  //     console.log(user)
  //     // navigation.reset({
  //     //   index: 0,
  //     //   routes: [{ name: 'User' }],
  //     // })

  //   }).catch(error => {
  //     Alert.alert('Failed to logout !');

  //   })
  // }

  useLayoutEffect(() => {

    navigation.setOptions({
      headerRight: () => (
        <ButtonWithIcon
          onPress={() => {
            showAddNewGroupAlert()
          }}
          image={images.add}
        />
      ),
      headerLeft: () => (
        <ButtonWithIcon
          onPress={() => {
            logout()
          }}
          image={images.logout}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chat Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebebeb'
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold'
  }
})

export default GroupsScreen