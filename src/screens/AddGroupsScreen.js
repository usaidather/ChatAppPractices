import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import CustomTextField from '../components/CustomTextField'
import Button from '../components/Button'
import Colors from '../utils/colors'
import Strings from '../const/String'
import Utility from '../utils/Utility'
import firebase, { firestore } from '../firebase/Firebase'


function AddGroupsScreen({ navigation }) {
    const [groupName, setGroupName] = useState('')
    const [fieldError, setFieldError] = useState('')
    const [isLoading, setIsloading] = useState(false)
   
    performCreateGroup = () => {
        const isValidField = validateField()
        if (isValidField) {
            createNewGroupToFireBase()
        }
    }

    function addMembersOfChatToFirebase(groupId, userID) {
        const membersRef = firestore.collection("members").doc(groupId).collection('member').doc()
        membersRef.set({
            userID: userID,
        })
            .then(function (docRef) {
                setIsloading(false)
                navigation.goBack()
            })
            .catch(function (error) {
                setIsloading(false)
                console.error("Error adding document: ", error);
            });

    }

    function createNewGroupToFireBase() {
        setIsloading(true)
        const groupsRef = firestore.collection("groups").doc()
        const userID = firebase.auth().currentUser.uid;

        groupsRef.set({
            groupID: groupsRef.id,
            groupName: groupName,
            userID: userID,
        }).then(function (docRef) {
            console.log("Document written with ID: ", groupsRef.id);
            addMembersOfChatToFirebase(groupsRef.id, userID)
        })
            .catch(function (error) {
                Alert.alert(docRef.id)
                setIsloading(false)
                console.error("Error adding document: ", error);
            });
    }

    validateField = () => {
        const isValidField = Utility.isValidField(groupName)
        isValidField ? setFieldError('') : setFieldError(Strings.GroupNameEmpty)
        return isValidField
    }

    return (
        <View style={styles.container}>

            <CustomTextField
                term={groupName}
                error={fieldError}
                placeHolder={Strings.EnterYourGroupname}
                onTermChange={newGroupName => setGroupName(newGroupName)}
                onValidateTextField={validateField}
            />

            <Button title={Strings.CreateGroup} onPress={performCreateGroup} isLoading={isLoading} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.theme
    },
})

export default AddGroupsScreen