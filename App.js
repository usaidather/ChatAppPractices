import 'react-native-gesture-handler';

import React from 'react'

import MainStackNavigator from './src/navigation/MainStackNavigator'
import {decode as atob, encode as btoa} from 'base-64'

export default function App() {
  return <MainStackNavigator />
}