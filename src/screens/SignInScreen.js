import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Button from '../components/Button'
import Color from '../utils/colors'
import Strings from '../const/String'


function SignInScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign In Screen</Text>
      <Button title = {Strings.Join}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.theme
  },
  text: {
    color: Color.black,
    fontSize: 24,
    fontWeight: 'bold'
  }
})

export default SignInScreen