import React, {useState} from 'react'
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import api_posts from '../calls'

const Create = (props) => {

    const [title, setTitle] = useState("new post title")
    const [contents, setContents] = useState("new post contents")
    const [newImage, setImage] = useState()                                        
    
    const createPost = () => {
        fetch(api_posts, {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                {
                    title:title, 
                    content:contents, 
                    author:1,
                    image:image.data
                }
            )
        })
        .then(resp => resp.json())
        .then(data => {
            props.navigation.navigate("Home") 
        })
        .catch(error => console.log(error))
    }

    const choosePhotoFromLibrary = () => {
        // No permissions request is necessary for launching the image library
        console.log("...choosing photo!")
    }

    const DisplayImage = () => {
        if(newImage == null)
        {
            //todo -- render image if uploaded here!
            console.log("no image selected")
            return (<Text style = {styles.marginStyle}>
                No image selected.
            </Text>)
        }
        else {
            console.log("new image's path is", newImage.path)
            return (
                <Image 
                    source= {{uri: newImage.path}}
                    style = {{width: newImage.width, height: newImage.height}}
                />
            )
        }
    }

    return (
        <ScrollView>
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
            <DisplayImage/>
            <Button style = {styles.marginStyle}
                icon = "file-image"
                mode = "contained"
                onPress = {() => choosePhotoFromLibrary()}
            >Select Image</Button>
            <Button style = {styles.marginStyle}
                icon = "upload"
                mode = "contained"
                onPress = {() => createPost()}
            >Post</Button>
        </ScrollView>
    )
}

export default Create

const styles = StyleSheet.create({
    inputStyle: {
        padding:10,
        margin:20
    },
    marginStyle: {
        margin:5
    }
})