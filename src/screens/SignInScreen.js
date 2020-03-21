import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Alert, SafeAreaView, Image, KeyboardAvoidingView } from 'react-native'
import Button from '../components/Button'
import EmailField from '../components/EmailTextField'
import PasswordField from '../components/PasswordTextField'
import Color from '../utils/colors'
import Strings from '../const/String'
import Images from '../const/Images'
import Constants from '../const/Constants'
import DismissKeyboard from '../components/DismissKeybaord'
import Utility from '../utils/Utility'
import firebase from '../firebase/Firebase'


function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isLoading, setIsloading] = useState(false)

  performSignIn = () => {
    const isValidEmail = validateEmailAddress()
    const isValidPassword = validatePasswordFeild()

    if (isValidEmail && isValidPassword) {
      setEmailError('')
      setPasswordError('')
      registration(email, password)
    }
  }

  validateEmailAddress = () => {
    const isValidEmail = Utility.isEmailValid(email)
    isValidEmail ? setEmailError('') : setEmailError(Strings.InvalidEmailAdress)
    return isValidEmail
  }

  validatePasswordFeild = () => {
    const isValidField = Utility.isValidField(password)
    isValidField ? setPasswordError('') : setPasswordError(Strings.PasswordFieldEmpty)
    return isValidField
  }

  registration = (email, password) => {
    try {
      setIsloading(true)
      // sign the user...
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
          setIsloading(false)

          Alert.alert('LoggedIn');
          // resetting the stack and navigation to home screen
          navigation.reset({
            index: 0,
            routes: [{ name: 'Groups Screen' }],
          });
        })
        .catch((error) => {
          // if user not found create a new user...
          firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(user => {
              setIsloading(false)

              Alert.alert('Created A New User');
            })
            .catch((error) => {
              setIsloading(false)
              console.log(error)
              Alert.alert(error);
            })
        })
    } catch (error) {
      setIsloading(false)
      Alert.alert(error);
    }
  }

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View>
          <SafeAreaView>

            <Image style={styles.logo} source={Images.logo} />

            <EmailField
              term={email}
              error={emailError}
              placeHolder={Strings.EmailPlaceHolder}
              onTermChange={newEmail => setEmail(newEmail)}
              onValidateEmailAddress={validateEmailAddress}
            />

            <PasswordField
              term={password}
              error={passwordError}
              placeHolder={Strings.PasswordPlaceHolder}
              onTermChange={newPassword => setPassword(newPassword)}
              onValidatePasswordField={validatePasswordFeild}
            />

            <Button title={Strings.Join} onPress={performSignIn} isLoading={isLoading} />

          </SafeAreaView>

        </View>
      </KeyboardAvoidingView>
    </DismissKeyboard>
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