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
  const [isJoined, setIsJoined] = useState(false)

  const { item } = route.params;
  const userID = firebase.auth().currentUser.uid;

  // useLayoutEffect(() => {

  //   var uID = userID.toString()
  //   var chatCreatorID = item.userID.toString()
  //   console.log('userID:', uID)
  //   console.log('chatCreatorID:', chatCreatorID)
  //   if (uID != chatCreatorID) {
  //     console.log('why the hell')
  //     navigation.setOptions({
  //       headerRight: () => (
  //         <View>

  //           {(isJoined) ? (
  //             <Button
  //               onPress={() => {
  //                 joinGroup()
  //               }}
  //               title={Strings.Join}
  //             />
  //           ) : null}
  //         </View>

  //       )
  //     });

  //   }
  // }, [navigation]);

  useEffect(() => {
    console.log(item)
    getUserJoinedAlreadyOrNot()
    getMessages()
  }, [])


  function getUserJoinedAlreadyOrNot() {

    firestore.collection("members").doc(item.groupID).collection('member').where("userID", "==", userID)
      .get()
      .then(function (querySnapshot) {
        console.log(querySnapshot.size)
        if (querySnapshot.size > 0) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            if (doc.data() != null) {
              setIsJoined(true)
            } else {
              Alert.alert('data')
              setIsJoined(false)
              showAlertToJoinGroup()

            }
          }
          );
        } else {
          showAlertToJoinGroup()

        }
      })

      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  function showAlertToJoinGroup() {
    Alert.alert(
      Strings.JoinChat,
      Strings.JoinChatConfirmMessage,
      [
        {
          text: 'Yes', onPress: () => {
            joinGroup()
          }
        },
        { text: 'No', onPress: () => console.log('No Pressed') },
      ],
      { cancelable: false }
    )
  }

  function joinGroup() {
    // setIsloading(true)
    const groupMemberRef = firestore.collection("members").doc(item.groupID).collection('member').doc()

    groupMemberRef.set({
      userID: userID,

    }).then(function (docRef) {
      Alert.alert(Strings.joinMessage)
      console.log("Document written with ID: ", groupMemberRef.id);
      setMessage('')
    })
      .catch(function (error) {
        Alert.alert(groupMemberRef.id)
        setIsloading(false)
        console.error("Error adding document: ", error);
      });
  }

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