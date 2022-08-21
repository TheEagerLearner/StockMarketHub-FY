import * as React from 'react';
import { Text, View,StyleSheet, AsyncStorage,FlatList,Linking, ToastAndroid,Image } from 'react-native';
import StockApi from '../../features/StockApi/StockApi';
import NewsCard from '../../components/NewsCard';

const News = ({navigation}) => {

    const [ticker,setTicker] = React.useState('');
    const [data,setData] = React.useState([
      {
        "Summaries": "Summary",
        "Links":"Links"
      }]);
    const [len,setLen] = React.useState(true);
  
    //used to get Ticker news
    const getStockNews = async (res) => {

      try{
        
        const response = await StockApi.get(`/news/${res}`);
        const data = response.data;
        setData(data);
        if(data.length==0){
          
        setLen(false);
        
        }

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
          //console.log(data);
          
      }
      catch(err){
          console.log(`getTicker error ===> ${err}`);
      }

  }



    React.useEffect(()=>{
        console.log("NEWs");
        getTicker();
        if(!len){
          ToastAndroid.show("No News available at the current moment",4000);
        }
    },[len]);
  
  
    return(
    <View style={stylesheet.container}>

{len?
      <FlatList 
          keyExtractor={item=>item.Summaries}
          data={data}
          renderItem={({item})=>{
            return(
            <NewsCard 
              news={item.Summaries}
              onPress={()=>{
                Linking.openURL(item.Links);
              }}
            />
            );
          }}
      />
      :
          <Image 

            style={{
              width:320,
              height:380,
              position:'absolute',
              alignSelf:'center',
            }}
            source={require('./../../../assets/noNews.png')}

          />
}
    </View>
  );
}

const stylesheet = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center'
    
  
  }
});

export default News;