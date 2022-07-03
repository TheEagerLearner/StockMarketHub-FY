import React,{useEffect, useState} from 'react';
import {View,StyleSheet,Text,ToastAndroid, Linking} from 'react-native';
import { AsyncStorage } from 'react-native';
import DashIcons from '../components/DashIcons';
import SearchBar from '../components/SearchBar';
import { auth, database } from '../features/Firebase/firebase';
import StockApi from '../features/StockApi/StockApi';

//icons
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


const Dashboard = ({navigation}) => {

    const [uid,setUid] = useState('');
    const [name,setName] = useState('user');
    const [ticker,setTicker] = useState('');


  const checkTicker = async () => {
      try{
        const response = await StockApi.get(`/stock/${ticker}`);  
        storeTicker();
        navigation.navigate('Home');
      }
      catch(err){
        
        console.log(err.message);
        ToastAndroid.show(err.code+'\n'+err.message,4000);

      }
  };

  //store ticker
  const storeTicker = async () => {

    try{

      await AsyncStorage.setItem(
        'ticker',
        ticker
      );

    }
    catch(err){
      console.log(err.title);
      console.log(err.message);
    }
  }


    //Retrive Auth Data and search in Realtime db using UID
    const retrieveData = async () => {
          auth.onAuthStateChanged((user) => {
            if (user) {
        
              var uid = user.uid;
              setUid(uid);
              // ...
              const dbRef = database.ref();
              dbRef.child("users").child(user.uid).get().then((snapshot) => {
                if (snapshot.exists()) {
                  var user=snapshot.val();
                  console.log(snapshot.val());
                  setName(user.username);
  
                } else {
                  console.log("No data available");
                }
              }).catch((error) => {
                console.error(error);
              });
            } else {
              // User is signed out
              // ...
              console.log('No user present');
            }
          });
          };


          useEffect(()=>{
            
            retrieveData();
            
          },[]);
         
         

    return(
        <View style={stylesheet.container}>
              <Text style={stylesheet.greeting_text_one}>Hello👋</Text>
              <Text style={stylesheet.greeting_text_two}>{name}</Text>
          
          <SearchBar 
              onChangeText={(value)=>{
                  setTicker(value);
                  
              }}

              onEndEditing={()=>{
                console.log(`ticker is ${ticker}`);
                //Linking.openURL('https://google.com');
                checkTicker();
                
                
              }}
          />

          <View style={stylesheet.icons_style}>


            <DashIcons 
              child={<MaterialCommunityIcons name="view-list" size={40} color="black" />}
              title={'Wishlist'}
            />
            <DashIcons 
              child={<MaterialCommunityIcons name="human-greeting-variant" size={34} color="black" />}
              title={'Profile'}
            />
            <DashIcons 
              child={<AntDesign name="infocirlce" size={34} color="black" />}
              title={'About'}
            />
            
          </View>
        </View>
    );
}

const stylesheet = StyleSheet.create({
    container:{
        flex:1,
    },
    greeting_text_one:{
      marginTop:50,
      marginLeft:10,
      fontSize:50,
      fontWeight:'bold',
      fontFamily:'sans-serif'
    },
    greeting_text_two:{
      marginLeft:10,
      fontSize:32,
      fontWeight:'bold',
      fontFamily:'sans-serif'
    },
    icons_style:{
      flexDirection:'row',
      justifyContent:'space-between',
      margin:10,
      marginTop:30,
      marginHorizontal:30
    }

});

export default Dashboard;