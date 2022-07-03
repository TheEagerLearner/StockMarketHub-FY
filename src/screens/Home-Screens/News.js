import * as React from 'react';
import { Text, View,StyleSheet, AsyncStorage,FlatList } from 'react-native';
import StockApi from '../../features/StockApi/StockApi';
import NewsCard from '../../components/NewsCard';

const News = ({navigation}) => {

    const [ticker,setTicker] = React.useState('');
    const [data,setData] = React.useState({
      'Summaries':['Hello Saurabh'],
      'Links':['www.google.com']
    });
  
    //used to get Ticker news
    const getStockNews = async (res) => {

      try{
        
        const response = await StockApi.get(`/news/${res}`);
        const data = response.data;
        setData(data);
        

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
          console.log(data);
          
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

      <FlatList 
          keyExtractor={item=>item.key}
          data={data.Summaries}
          renderItem={({item})=>{
            return(
            <NewsCard 
              news={item}
            />
            );
          }}
      />

    </View>
  );
}

const stylesheet = StyleSheet.create({
  container:{
    flex:1,
    
  
  }
});

export default News;