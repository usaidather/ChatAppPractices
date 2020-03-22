import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import Constants from '../const/Constants'
import Images from '../const/Images'
import Color from '../utils/colors'

function GroupsItem({ item }) {

    return (
        <View >
            <View style={styles.container}>
                <Image source={Images.groups} style={styles.Image} />
                <View style={{ justifyContent: 'center' }}>
                    <Text style={styles.groupTitle}>{item.groupName}</Text>
                    <Text style={styles.groupMembers} >{item.groupMembers}</Text>
                </View>
            </View>
            <View style={styles.separator}></View>

        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: 90,
        width: Constants.screenWidth,
        margin: 10

    },

    descriptionContainer: {
        margin: 5
    },

    Image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        shadowColor: Color.gray,
        shadowOpacity: 0.4,
        shadowOffset: { height: 1, width: 1 },
        shadowRadius: 2,
        backgroundColor: Color.theme
    },

    groupTitle: {
        color: Color.gray,
        fontSize: 24,
        fontWeight: 'bold',
        marginHorizontal: 10

    },
    groupMembers: {
        color: Color.smoke,
        fontSize: 14,
    },
    separator: {
        height: 0.5,
        width: Constants.width,
        backgroundColor: Color.theme
    }

})

export default GroupsItem