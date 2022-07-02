import * as React from 'react';
import { Text, View,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const News = ({navigation}) => {

  return(
    <View style={stylesheet.container}>

      <Text>News zai mare ?</Text>

    </View>
  );
}

const stylesheet = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  
  }
});

export default News;