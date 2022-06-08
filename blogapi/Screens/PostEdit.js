import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import api_call from '../App'

export default function PostEdit(props) {

    const data = props.route.params.data

    const [title, setTitle] = useState(data.title)
    const [contents, setContents] = useState(data.content)

    const updateData = () => {
        fetch(api_call(`post/${data.id}/`), {
            method: "PUT",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                {
                    title:title, 
                    content:contents, 
                    author:data.author
                }
            )
        })
        .then(resp => resp.json())
        .then(data => {
            //make sure that data gets refreshed
            props.navigation.navigate("Home", {data:data}) //navigate back home with updated data
        })
        .catch(error => console.log(error))
    }

    return (
        <View>
            <TextInput style = { styles.inputStyle }
                label = "Title"
                value = {title}
                mode = "outlined"

                onChangeText = {text => setTitle(text)}
            />
            <TextInput style = { styles.inputStyle }
                label = "Contents"
                value = {contents}
                mode = "outlined"
                multiline 
                numberOfLines = {10}

                onChangeText = {text => setContents(text)}
            />
            <Button style = {styles.inputStyle}
                icon = "update"
                mode = "contained"
                onPress = {() => updateData()}
            >Edit</Button>
            <Button style = {styles.inputStyle}
                icon = "cancel"
                mode = "contained"
                onPress = {() => props.navigation.navigate("Home")} //navigate back home without updating data
            >Cancel</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    inputStyle: {
        padding:10,
        margin:20
    }
})