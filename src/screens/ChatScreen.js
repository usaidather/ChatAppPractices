import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, FlatList, KeyboardAvoidingView } from 'react-native'
import firebase, { firestore } from '../firebase/Firebase'
import MessageFieldView from '../components/MessageFieldView'
import Color from '../utils/colors'
import constants from '../const/Constants'
import Strings from '../const/String'
import DismissKeyboard from '../components/DismissKeybaord'


function ChatScreen({ route, navigation }) {
  const [chat, setChats] = useState([]);
  const [message, setMessage] = useState('')

  const { item } = route.params;

  useEffect(() => {
    console.log(item)

    // getChats()
  }, [])

  function getChats() {
    const db = firestore
    var cities = [];

    db.collection("groups")
      .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
            console.log("New city: ", change.doc.data());
            cities.push(change.doc.data());
            console.log(cities)

          }
          if (change.type === "modified") {
            console.log("Modified city: ", change.doc.data());
          }
          if (change.type === "removed") {
            console.log("Removed city: ", change.doc.data());
          }
        });
      });
  }

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }} behavior="padding" enabled keyboardVerticalOffset={100}>
        <View style = {styles.container}>
          <FlatList
            style={styles.flatList}
            data={chat}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({ item }) => {

              return (
                <TouchableOpacity onPress={() => {
                  navigation.navigate('Chat Screen', {
                    item
                  })

                }}>
                  <GroupItems item={item} />
                </TouchableOpacity>
              )
            }}
          />
          <View style={styles.messageFieldView}>
            <MessageFieldView term={message}
              placeHolder={Strings.TypeYourMessage}
              onTermChange={message => setMessage(message)}
            // onValidateTextField={validateField}
            />
          </View>
        </View>
      </KeyboardAvoidingView>

    </DismissKeyboard>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  flatList: {
    margin: 10,
    flex: 0.9,
  },
  messageFieldView: {
    flex: 0.1,
  }

})

export default ChatScreen