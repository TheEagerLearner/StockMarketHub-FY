import React, { useEffect, useState } from 'react';
import { View,StyleSheet,Text, AsyncStorage,Dimensions  } from 'react-native';
import StockApi from '../../features/StockApi/StockApi';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";


const Analysis = ({navigation}) => {


    var newData = [];
    const [ticker,setTicker] = useState('');
   



    
    const screenWidth = Dimensions.get("window").width;

    const arrangeData = (data) => {
        const len = data.length;
        let label = [];
        let dataset = [];
        for (var i = len-5; i<len; i++){
            dataset = [...dataset,data[i].close];
            label = [...label,data[i].date];

        }   

        newData = {
            "datasets":[
                {
                "data":dataset
            }
        ],
            "labels":label
        }

        console.log(newData);
        

    }

    const getStockHist = async (res) => {

        try{
            const response = await StockApi.get(`/stock/${res}/`);
            const data = response.data;
            console.log(data[0]); //gets all the stock historical data from the start date
            arrangeData(data);

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
  

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };

    return(
        <View style={stylesheet.container}>
            <LineChart
                data={{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
            />
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