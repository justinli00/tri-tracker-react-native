import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Button, FlatList, Alert } from 'react-native'; //flatlists -- a way to interpret JSON data
import { Card, FAB } from 'react-native-paper'
import api_posts from '../calls'

//FAB: "Floating action button"

export default function Home(props) {
    
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const loadData = () => {
        //fetch the data
        fetch(global.api_posts, { 
            method:"GET"
        })

        .then(resp => resp.json())
        .then(data => {
            //console.log(data)
            setData(data)
            setLoading(false)
        })
        .catch(error => Alert.alert("Error:", error.message))
    }

    const clickedPost = (data) => {
        props.navigation.navigate("Details", {data:data} )
    }

    useEffect(() => {
        loadData();
    }, [])

    const renderData = (item) => {
        return (
            <Card style= {styles.cardStyle}
                onPress = {() => clickedPost(item) }
            >
                <Text style = {{color:"red", fontSize:25}}> {item.title} </Text>
                <Text style = {{color:"red", fontSize:20}}> {item.content} </Text>
            </Card>
        )
    }
    

    //todo -- automatic data refresh on navigating back
    return (
        <View>
            <FlatList
                data = {data}
                renderItem = {({item}) =>  {
                    return renderData(item)
                }}
                onRefresh = { () => loadData() }
                refreshing = { loading }
                keyExtractor = { item => item.id}
            />
            <FAB
                style = {styles.addButton}
                small = {false}
                icon = "plus"

                onPress = {() => props.navigation.navigate("Create")}
            />
            <FAB
                style = {styles.drawButton}
                small = {false}
                icon = "grease-pencil"
                onPress = {() => props.navigation.navigate("TrackRun")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    cardStyle: {
        padding:10,
        margin:10,
        width: 1000,
    },
    addButton: {
        position:'absolute',
        margin:10,
        right:0,
        bottom:0
    },
    drawButton: {
        margin:10,
        left:250,
        width:55,
        bottom:0
    }
})