import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Screens/Home';
import Create from './Screens/Create';
import PostDetails from './Screens/PostDetails';
import PostEdit from './Screens/PostEdit';
import TrackRun from './Screens/TrackRun';

//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

const myStyles = {
    title: "Image List bababooey",
    headerTintColor:"white",
    headerStyle: {
      backgroundColor:"blue"
    }
}

function App() {
  return (
    <View style = {styles.container}>
    <Stack.Navigator>
      <Stack.Screen name = "Home" component = {Home} 
      options = {myStyles}/> 
      <Stack.Screen name = "Create" component = {Create}
      options = {{...myStyles, title:"Create a new post"}} /> 
      <Stack.Screen name = "Details" component = {PostDetails}
      options = {{...myStyles, title:"Post Details"}} /> 
      <Stack.Screen name = "Edit" component = {PostEdit}
      options = {{...myStyles, title:"Edit current post"}} /> 
      <Stack.Screen name = "TrackRun" component = {TrackRun}
      options = {{...myStyles, title:"Track your run!"}} /> 
    </Stack.Navigator>
    </View>
  );
}

export default() => {
  return(
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                  
    backgroundColor: '#5f5',
  },
  textStyle :{
    fontSize:25,
    color:"red"
  }
});
