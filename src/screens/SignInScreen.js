import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, SafeAreaView, Image } from 'react-native'
import Button from '../components/Button'
import EmailField from '../components/EmailTextField'
import PasswordField from '../components/PasswordTextField'
import Color from '../utils/colors'
import Strings from '../const/String'
import Images from '../const/Images'
import Constants from '../const/Constants'

function SignInScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
   navigationOptions = ({ navigation }) => {
    return {
       header: () => null
    } 
}

  performSignIn = () => {
    console.log(email)
  }


  return (
    <View style={styles.container}>
      <SafeAreaView>

        <Image style = {styles.logo} source={Images.logo}/>

        <EmailField
          term={email}
          placeHolder="Email Address"
          onTermChange={newEmail => setEmail(newEmail)} />

        <PasswordField
          term={password}
          placeHolder="Password"
          onTermChange={newPassword => setPassword(newPassword)} />

        <Button title={Strings.Join} onPress={performSignIn} />
      </SafeAreaView>

    </View>
  )
}

const styles = StyleSheet.create({

  logo: {
    alignSelf: 'center',
    margin: 0.04 * Constants.screenHeight
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.theme
  },
})

export default SignInScreen