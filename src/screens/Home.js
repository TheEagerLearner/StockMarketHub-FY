import * as React from 'react';
import { Text, View,StyleSheet,ToastAndroid } from 'react-native';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import StockApi from '../features/StockApi/StockApi';
import { Entypo } from '@expo/vector-icons';
import { auth,database } from '../features/Firebase/firebase';


import News from './Home-Screens/News';
import Analysis from './Home-Screens/Analysis';
import SearchBar from '../components/SearchBar';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Tab = createMaterialTopTabNavigator();

export default function Home() {
  


  const [ticker,setTicker] = React.useState('');
  const [uid,setUid] = React.useState('');
  const [name,setName] = React.useState('user');
  const [inWish,setInWish] = React.useState(false);

  
        //Retrive Auth Data and search in Realtime db using UID
        const retrieveData = async (res) => {
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
                  const wishlist = user.wishlist;
                  setInWish(wishlist.includes(res.toUpperCase()));
                  console.log(wishlist);
                  //console.log(wishlist.includes(res.toUpperCase()));

  
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

  

  const checkTicker = async () => {
    try{
      const response = await AsyncStorage.getItem('ticker');
      retrieveData(response);
      setTicker(response);
      
    }
    catch(err){
      
      console.log(err.message);
      ToastAndroid.show(err.code+'\n'+err.message,4000);

    }
  };

  React.useEffect(()=>{
    checkTicker();
  },[]);

  return (
    <View style={stylesheet.container}>

    <View style={stylesheet.header_tab}>
      <Text style={{
        fontSize:18,
        fontWeight:'bold'
      }}>{ticker}</Text>
      <TouchableOpacity
        style={stylesheet.wishlist}
        onPress={()=>{
          console.log("Tapped on Wishlist");
        }}
      >
        {inWish?<Entypo name="heart" size={28} color="red" />:<Entypo name="heart-outlined" size={28} color="red" />}
      </TouchableOpacity>
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
    padding:20,
    paddingHorizontal:20,
    flexDirection:'row',
    justifyContent:'flex-start'
  },
  wishlist:{
    marginLeft:10
  }
});
