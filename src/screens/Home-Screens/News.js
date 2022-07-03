import * as React from 'react';
import { Text, View,StyleSheet, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import StockApi from '../../features/StockApi/StockApi';

const News = ({navigation}) => {

    const [ticker,setTicker] = React.useState('');
  
    //used to get Ticker news
    const getStockNews = async (res) => {

      try{
        
        const response = await StockApi.get(`/news/${res}`);
        const data = response.data;
        console.log(data);

      }
      catch(err){
        console.log(`getStockNews error ==> ${err}`);
      }

    }

    //used to get ticker
    const getTicker = async () => {

      try{
          const response = await AsyncStorage.getItem('ticker');
          getStockNews(response);
          setTicker(response);
          
      }
      catch(err){
          console.log(`getTicker error ===> ${err}`);
      }

  }



    React.useEffect(()=>{
        console.log("NEWs");
        getTicker();
    },[]);
  
  
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