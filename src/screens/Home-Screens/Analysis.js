import React, { Profiler, useEffect, useState } from 'react';
import { View,StyleSheet,Text, AsyncStorage,Dimensions,ScrollView  } from 'react-native';
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
            <View style={stylesheet.summary} >
                <Text>According to our Technical Analysis Model</Text>
                <Text>{`${lol.ml.pred} ${lol.ml.accuracy}`}</Text>
                <Text>According to our News Analyzer</Text>
                <Text>{`${lol.news.pred} `}</Text>
                
            </View>
        </ScrollView>
    );
}

const stylesheet = StyleSheet.create({
    container:{
     flex:1
    },
    graph:{
        paddingVertical:10,
        backgroundColor:'white',
        borderRadius:10,
        margin:10,
        elevation:8,
    },
    summary:{
        padding:10,
        borderWidth:0,
        width:Dimensions.get('window').width-30,
        alignSelf:'center',
        elevation:4,
        margin:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff'


    }
});

export default Analysis;