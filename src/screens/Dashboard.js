import React,{useEffect, useState} from 'react';
import {View,StyleSheet,Text,ToastAndroid, Alert,KeyboardAvoidingView,BackHandler,StatusBar} from 'react-native';
import { AsyncStorage } from 'react-native';
import DashIcons from '../components/DashIcons';
import SearchBar from '../components/SearchBar';
import { auth, database } from '../features/Firebase/firebase';
import StockApi from '../features/StockApi/StockApi';

//icons
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Loader from '../components/Loader';


const Dashboard = ({navigation}) => {

  
  const quotes = [
    " An investment in knowledge pays the best interest. — Benjamin Franklin ",
    "Bottoms in the investment world don't end with four-year lows; they end with 10- or 15-year lows. — Jim Rogers",
    "I will tell you how to become rich. Close the doors. Be fearful when others are greedy. Be greedy when others are fearful. — Warren Buffett",
    "With a good perspective on history, we can have a better understanding of the past and present, and thus a clear vision of the future. — Carlos Slim Helu",
    "It's not whether you're right or wrong that's important, but how much money you make when you're right and how much you lose when you're wrong. — George Soros",
    "Given a 10% chance of a 100 times payoff, you should take that bet every time. — Jeff Bezos",
    "Don't look for the needle in the haystack. Just buy the haystack! — John Bogle",
    "I don't look to jump over seven-foot bars; I look around for one-foot bars that I can step over. — Warren Buffett",
    "The stock market is filled with individuals who know the price of everything, but the value of nothing. — Phillip Fisher",
    "In investing, what is comfortable is rarely profitable. — Robert Arnott",
    "How many millionaires do you know who have become wealthy by investing in savings accounts? I rest my case. — Robert G. Allen",
    "Courage taught me no matter how bad a crisis gets ... any sound investment will eventually pay off. — Carlos Slim Helu",
    "The biggest risk of all is not taking one. — Mellody Hobson",
    "Returns matter a lot. It's our capital. — Abigail Johnson",
    "Know what you own, and know why you own it. — Peter Lynch",
    "Investing should be more like watching paint dry or watching grass grow. If you want excitement, take $800 and go to Las Vegas. — Paul Samuelson"

]

  const [quote, setQuote] = useState( "In investing, what is comfortable is rarely profitable. — Robert Arnott");

    const [uid,setUid] = useState('');
    const [name,setName] = useState('user');
    const [ticker,setTicker] = useState('');
    const [loader,setLoader] = useState(false);


  const checkTicker = async () => {
      try{
        const response = await StockApi.get(`/stock/${ticker}`); 
        storeTicker();
        navigation.navigate('Home');
        setLoader(false);
      }
      catch(err){
        
        console.log(err.message);
        setLoader(false);
        ToastAndroid.show('Stock ticker does not exist',4000);

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

  const storeData = async (username,email) => {
    try{
      await AsyncStorage.setItem(
        'name',
        username
      );
      await AsyncStorage.setItem(
        'email',
        email
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
                  storeData(user.username,user.email);
  
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
            const interval = setInterval(() => {
              const random = Math.floor(Math.random() * 16)
              setQuote(quotes[random])
              }, 10000);
              return () => clearInterval(interval)

            
          },[setQuote]);

          // useEffect(() => {
          //   const backAction = () => {
          //     Alert.alert("Hold on!", "Are you sure you want to go back?", [
          //       {
          //         text: "Cancel",
          //         onPress: () => null,
          //         style: "cancel"
          //       },
          //       { text: "YES", onPress: () => BackHandler.exitApp() }
          //     ]);
          //     return true;
          //   };
        
          //   const backHandler = BackHandler.addEventListener(
          //     "hardwareBackPress",
          //     backAction
          //   );
        
          //   return () => backHandler.remove();
          // }, []);
          useEffect(
            () =>
              navigation.addListener('beforeRemove', (e) => {
        
                // Prevent default behavior of leaving the screen
                e.preventDefault();
        
                // Prompt the user before leaving the screen
                Alert.alert(
                  'Leaving App ?',
                  'Are you sure you want to leave the app ?',
                  [
                    { text: "Don't leave", style: 'cancel', onPress: () => {} },
                    {
                      text: 'Leave',
                      style: 'destructive',
                      // If the user confirmed, then we dispatch the action we blocked earlier
                      // This will continue the action that had triggered the removal of the screen
                      onPress: () => BackHandler.exitApp(),
                    },
                  ]
                );
              }),
            [navigation]
          );
         

    return(
        <KeyboardAvoidingView style={stylesheet.container}>
              <Text style={stylesheet.greeting_text_one}>Hellooo👋</Text>
              <Text style={stylesheet.greeting_text_two}>{name}</Text>
          
          <SearchBar 
              onChangeText={(value)=>{
                  setTicker(value);
                  
              }}

              onEndEditing={()=>{
                console.log(`ticker is ${ticker}`);
                setLoader(true); 
                //Linking.openURL('https://google.com');
                checkTicker();
                
                
              }}
          />

          <View style={stylesheet.icons_style}>

          <StatusBar barStyle="dark-content" backgroundColor="#fff" />



            <DashIcons 
              child={<MaterialCommunityIcons name="view-list" size={40} color="black" />}
              title={'Wishlist'}
              onPress={()=>{navigation.navigate('Wishlist')}}
            />
            <DashIcons 
              child={<MaterialCommunityIcons name="human-greeting-variant" size={34} color="black" />}
              title={'Profile'}
              onPress={()=>{navigation.navigate('Profile')}}
            />
            <DashIcons 
              child={<AntDesign name="infocirlce" size={34} color="black" />}
              title={'About'}
              onPress={()=>{navigation.navigate('About')}}
            />
            
          </View>
          <View style={stylesheet.quoteBg}>
          

          <Text style={stylesheet.headQuote}>Quote for the Day :</Text>
            <Text style={stylesheet.txtQuote}>{quote}</Text>
          
        </View>
        {loader?
        <Loader 
          link={require('./../../assets/loader.gif')}
          style={{
            backgroundColor:'#E1D3CA'
          }}
        />:null}
        </KeyboardAvoidingView>
    );
}

const stylesheet = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    greeting_text_one:{
      marginTop:10,
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
      marginHorizontal:30,
      elevation:4
    },
    quoteBg: { 
      //position: "absolute",
      marginTop:300,
      margin: 40,
      borderTopLeftRadius: 25,
      borderBottomRightRadius: 25,
      width:'96%',
      //elevation:4,
      padding:10,
      alignSelf:'center',
      backgroundColor:'#C3BEF0'
    },
    txtQuote: {
      fontSize: 20,
      fontWeight: "400"
    },
    headQuote: {
      fontSize: 22,
      fontWeight: "500",
      paddingTop: 10,
      paddingBottom: 5, 
    }

});

export default Dashboard;
