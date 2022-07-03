import * as React from 'react';
import { Text, View,StyleSheet,ToastAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import StockApi from '../features/StockApi/StockApi';

import News from './Home-Screens/News';
import Analysis from './Home-Screens/Analysis';
import SearchBar from '../components/SearchBar';


const Tab = createMaterialTopTabNavigator();

export default function Home() {

  const [ticker,setTicker] = React.useState('');

  const checkTicker = async () => {
    try{
      const response = await StockApi.get(`/stock/${ticker}`);
      let data = response.data;
      console.log(data);
      
    }
    catch(err){
      
      console.log(err.message);
      ToastAndroid.show(err.code+'\n'+err.message,4000);

    }
  };

  return (
    <View style={stylesheet.container}>

    <View style={stylesheet.header_tab}>

    </View>

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
  
  },
  header_tab:{
    padding:10
  }
});
