import React, { useState, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, FlatList, KeyboardAvoidingView, Alert, Button } from 'react-native'
import firebase, { firestore } from '../firebase/Firebase'
import MessageFieldView from '../components/MessageFieldView'
import Color from '../utils/colors'
import constants from '../const/Constants'
import Strings from '../const/String'
import DismissKeyboard from '../components/DismissKeybaord'
import MessageItem from '../components/MessageItem'


function ChatScreen({ route, navigation }) {
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState('')

  const { item } = route.params;
  const userID = firebase.auth().currentUser.uid;

  useLayoutEffect(() => {
    if (userID != item.userID) {
      navigation.setOptions({
        headerRight: () => (
          <Button
            onPress={() => {
            }}
            title={Strings.Join}
            color={Color.white}
          />
        )
      });
    }
  }, [navigation]);

  useEffect(() => {
    console.log(item)

    getMessages()
  }, [])

  function getMessages() {
    const db = firestore
    var messages = [];

    db.collection("message").doc(item.groupID).collection('messages')
      .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
            console.log("New message: ", change.doc.data());
            messages.push(change.doc.data());
            console.log(messages)

          }
          if (change.type === "modified") {
            console.log("Modified message: ", change.doc.data());
          }
          if (change.type === "removed") {
            console.log("Removed message: ", change.doc.data());
          }

          setMessageList(messages)
        });
      });
  }

  function sendMessagesToChat() {
    // setIsloading(true)
    const messageRef = firestore.collection("message").doc(item.groupID).collection('messages').doc()
    const userEmail = firebase.auth().currentUser.email

    messageRef.set({
      messageID: messageRef.id,
      message: message,
      senderID: userID,
      senderEmail: userEmail

    }).then(function (docRef) {
      console.log("Document written with ID: ", messageRef.id);
      setMessage('')
    })
      .catch(function (error) {
        Alert.alert(messageRef.id)
        setIsloading(false)
        console.error("Error adding document: ", error);
      });
  }

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }} behavior="padding" enabled keyboardVerticalOffset={100}>
        <View style={styles.container}>
          <FlatList
            style={styles.flatList}
            data={messageList}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({ item }) => {

              return (
                <TouchableOpacity onPress={() => {
                  navigation.navigate('Chat Screen', {
                    item
                  })

                }}>
                  <MessageItem item={item} />
                </TouchableOpacity>
              )
            }}
          />
          <View style={styles.messageFieldView}>
            <MessageFieldView term={message}
              placeHolder={Strings.TypeYourMessage}
              onTermChange={message => setMessage(message)}
              onSubmit={sendMessagesToChat}
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