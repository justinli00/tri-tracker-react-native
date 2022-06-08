import { StyleSheet, View, Text, Image, ScrollView, Alert } from 'react-native'
import { Button } from 'react-native-paper'
import React from 'react'
import api_call from '../App'

export default function PostDetails(props) {

    const data = props.route.params.data
    const deleteData = (data) => {
        fetch(api_call(`post/${data.id}/`), {
            method: "DELETE",
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(data => {
            props.navigation.navigate("Home") //go back home; data is deleted
        })
        .catch(error => console.log(error))
    }
/*
    const deleteConfirmAlert = (data) =>
        Alert.alert(
            "Delete Post?",
            "Are you sure you want to delete this post?",
            {
                text: "Yes",
                onPress: deleteData(data)
            },
            {
                text: "Cancel",
                onPress = () => { console.log("Cancelled.")}
            }
        )
*/
    return (
        <ScrollView>
        <View>
            <Text style = {{fontSize:25, margin:10}}> #{data.id}: {data.title}</Text>
            <Text style = {{fontSize:15, margin:10}}> {data.content}</Text>
            <Text style = {{fontSize:15, margin:10}}> the image url is: {data.image}</Text>
            <Image 
                style = {{width:300, height:400, justifyContent:"center"}}
                source = {{uri:data.image}}
            />
            <View>
                <Button
                    style = {styles.btnStyle}
                    icon = "update"
                    mode = "contained"
                    onPress = {() => props.navigation.navigate("Edit", {data:data}) }
                >Edit</Button>
                <Button
                    style = {styles.btnStyle}
                    icon = "delete"
                    mode = "contained"
                    onPress = {() => deleteData(data)}
                >Delete</Button>
            </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    btnStyle: {
        flexDirection: "row",
        justifyContent: "space-around",
        margin:15,
        padding:10
    }
})