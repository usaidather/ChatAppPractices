import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

function GroupsScreen({ navigation }) {
  // navigation.reset({
  //   index: 0,
  // })
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