import React, { useEffect, useState } from 'react';
import { View,StyleSheet,Text, AsyncStorage } from 'react-native';
import StockApi from '../../features/StockApi/StockApi';

const Analysis = ({navigation}) => {

    const [ticker,setTicker] = useState('');

    const getStockHist = async (res) => {

        try{
            const response = await StockApi.get(`/stock/${res}/`);
            const data = response.data;
            console.log(data[0]); //gets all the stock historical data from the start date

        }
        catch(err){
            console.log(`getStockHist error ===> ${err}`);
        }

    }

    //used to get ticker
    const getTicker = async () => {

        try{
            const response = await AsyncStorage.getItem('ticker');
            getStockHist(response);
            setTicker(response);
            
        }
        catch(err){
            console.log(`getTicker error ===> ${err}`);
        }

    }

    useEffect(()=>{
        console.log("Analysis");
        getTicker();
        
    },[]);

    return(
        <View style={stylesheet.container}>
            <Text>Analysis zai re ?</Text>
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

export default Analysis;