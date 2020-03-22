import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import firebase, { firestore } from '../firebase/Firebase'

function ChatScreen() {

  useEffect(() => {
    getChats()
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
    <View style={styles.container}>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

})

export default ChatScreen