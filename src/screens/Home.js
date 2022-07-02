import * as React from 'react';
import { Text, View,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import News from './Home-Screens/News';
import Analysis from './Home-Screens/Analysis';


const Tab = createMaterialTopTabNavigator();

export default function Home() {
  return (
    <View style={stylesheet.container}>

    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 18 },
          
          tabBarStyle: { backgroundColor:'#FFF'},
        }}
      >
        <Tab.Screen name="Analysis" component={Analysis} />
        <Tab.Screen name="News" component={News} />
      </Tab.Navigator>
    </NavigationContainer>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:20,
    backgroundColor:'#FFF'
  
  }
});
