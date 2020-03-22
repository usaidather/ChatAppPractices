import React, { useLayoutEffect, useState, useEffect } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import ButtonWithIcon from '../components/ButtonWithBackground'
import images from '../const/Images'
import GroupItems from '../components/GroupsItem'
import firebase, { firestore } from '../firebase/Firebase'
import Color from '../utils/colors'


function GroupsScreen({ navigation }) {
  const [groups, setGroups] = useState([]);

  useLayoutEffect(() => {

    navigation.setOptions({
      headerRight: () => (
        <ButtonWithIcon
          onPress={() => {
            navigation.navigate('Add Group Screen')
          }}
          image={images.add}
        />
      ),
      headerLeft: () => (
        <ButtonWithIcon
          onPress={() => {
            firebase.auth().signOut()
          }}
          image={images.logout}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    getChats()
  }, [])

  function getChats() {
    const db = firestore
    var groupArray = [];

    db.collection("groups")
      .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
            console.log("New Group: ", change.doc.data());
            groupArray.push(change.doc.data());

          }
          if (change.type === "modified") {
            console.log("Modified Group: ", change.doc.data());
          }
          if (change.type === "removed") {
            console.log("Removed Group: ", change.doc.data());
          }

          setGroups(groupArray)

        });
      });

  }

  return (
    <View style={styles.container}>
      <FlatList

        data={groups}
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white
  },
  flatList: {
    margin: 10
  }
})

export default GroupsScreen