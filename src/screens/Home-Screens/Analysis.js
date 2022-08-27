import React, { Profiler, useEffect, useState } from 'react';
import { View,StyleSheet,Text, AsyncStorage,Dimensions,ScrollView  } from 'react-native';
import StockApi from '../../features/StockApi/StockApi';
import ProgressCircle from 'react-native-progress-circle'

import {
    LineChart
  } from "react-native-chart-kit";
import Percentage from '../../components/Percentage';


const Analysis = ({navigation}) => {


    var newData = [];
    const [ticker,setTicker] = useState('');
    const [stockdata,setStockData] = useState( { "datasets": [
         {
          "data":  [
            8.550000190734863,
            8.550000190734863,
            8.75,
          ],
        },
      ],
      "labels":  [
        "2022-06-22",
        "2022-06-23",
        "2022-06-24",
      ]
    });

    const [predData,setPredData] = useState({ "datasets": [
        {
         "data":  [
           8.550000190734863,
           8.550000190734863,
           8.75,
         ],
       },
     ],
     "labels":  [
       "2022-06-22",
       "2022-06-23",
       "2022-06-24",
     ]
   });

   const [lol,setLol] = useState( {
    "ml":{
        "pred":"loading",
        "accuracy":"loading"
    },
    "news":{
        "pred":"loading"
    }
});


   
    const screenWidth = Dimensions.get("window").width;
    


    const getPred = async (res) => {
        try{
            const response =  (await StockApi.get(`/predict/ml/${res}`)).data;
            const newsPred =  (await StockApi.get(`/predict/senti/${res}`)).data.Prediction;
            const mlPred = response.Prediction;
            let accuracy = response.Accuracy;

            const newpredData = {
                "ml":{
                    "pred":mlPred,
                    "accuracy":accuracy
                },
                "news":{
                    "pred":newsPred
                }
            }
            setLol(newpredData);

        }
        catch(err){
            console.log(`error at getPred =====> ${err}`);
        } 
    } 

   const getPredValue = async (res) => {
        try{
            
            const response = await StockApi.get(`/predict/ml/${res}/values`);
            const data = response.data.Data;
            //console.log(data);
            let label = [];
            let dataset = [];

            const len = data.length;
            
            for (var i = len-31; i<len; i++){
                dataset = [...dataset,data[i].PredictedVal];
                label = [...label,i];
    
            }   
     
        newData = {
            "datasets":[
                {
                "data":dataset
            }
        ],
            "labels":label,
        }

        //console.log(newData);
        setPredData(newData);

            

        }
        catch(err){
            console.log(`error at getPredValue =====> ${err}`);
        }
   }




    
    //gets stock historical data
    const getStockHist = async (res) => {

        try{
            
            const response = await StockApi.get(`/predict/ml/${res}/values`);
            const data = response.data.Data;
            //console.log(data);
            let label = [];
            let dataset = [];

            const len = data.length;
            
            for (var i = len-31; i<len; i++){
                dataset = [...dataset,data[i].ActualVal];
                label = [...label,i];
    
            }   
     
        newData = {
            "datasets":[
                {
                "data":dataset
            }
        ],
            "labels":label
        }

        //console.log(newData);
        setStockData(newData);

            

        }
        catch(err){
            console.log(`error at getPredValue =====> ${err}`);
        }
    }


    //used to get ticker
    const getTicker = async () => {

        try{
            const response = await AsyncStorage.getItem('ticker');
            setTicker(response);
            console.log(ticker);
            getStockHist(response);
            getPredValue(response);
            getPred(response);
            
        }
        catch(err){
            console.log(`getTicker error ===> ${err}`);
        }

    }

    useEffect(()=>{
        console.log("Analysis");
        getTicker();
    
        
    },[]);
  

    const chartConfig ={
        backgroundColor: "#fff",
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        withVerticalLines:false,
        withHorizontalLines:false,
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgb(147, 125, 194)`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16
        },
        propsForDots: {
          r: "1",
          strokeWidth: "2",
          stroke: "#FCC5C0"
        }
      };

      const prochartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(147, 125, 194, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };


    return(
        <ScrollView style={stylesheet.container}>
            <View style={stylesheet.graph}>
                
            <Text
                style={{
                    textAlign:'center',
                    marginBottom:20

                }}
            >Actual graph depicting {ticker} curve past 1 month</Text>
                <LineChart
                    data={stockdata}
                    width={screenWidth-30}
                    height={200}
                    verticalLabelRotation={0}
                    chartConfig={chartConfig}
                    withVerticalLabels={false}
                    withVerticalLines={false}
                    withHorizontalLines={false}
                    withShadow={false}
                    bezier
                   
                />
            </View>
            <View style={stylesheet.graph}>
            
            <Text
                style={{
                    textAlign:'center',
                    marginBottom:20
                }}
            >Predicted graph depicting {ticker} curve past 1 month</Text>
                <LineChart
                    data={predData}
                    width={screenWidth-30}
                    height={200}
                    verticalLabelRotation={0}
                    chartConfig={chartConfig}
                    withVerticalLabels={false}
                    withVerticalLines={false}
                    withHorizontalLines={false}
                    withShadow={false}
                    bezier
                   
                />
            </View>
            <Text
                style={{
                    marginLeft:20,
                    marginTop:10,
                    marginBottom:10,
                    fontWeight:'bold'
                }}
            >SUMMARY</Text>
                <Percentage 
                   
                    text = {`According to our technical Analyzer model it is suggested to ${lol.ml.pred} with an accuracy of ${lol.ml.accuracy}`}
                    percent = {lol.ml.accuracy}
                />
                
                <Percentage 
                  
                    text ={`According to our news Analyzer model it has suggested to ${lol.news.pred} `}
                    percent = {"100%"}
                />
                <View style={{
                    paddingBottom:100
                }}>

                </View>
                
        
        </ScrollView>
    );
}

const stylesheet = StyleSheet.create({
    container:{
     flex:1,
    },
    graph:{
        paddingVertical:10,
        backgroundColor:'white',
        borderRadius:10,
        margin:10,
        elevation:8,
    },

});

export default Analysis;