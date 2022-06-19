import React,{useEffect, useState} from 'react';
import {View,StyleSheet,Text,TextInput} from 'react-native';
import { AsyncStorage } from 'react-native';
import { auth, database } from '../features/Firebase/firebase';

const Dashboard = ({navigation}) => {

    const [uid,setUid] = useState('');
    const [name,setName] = useState('user');


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
            <Text>Hello {name}</Text>
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

export default Dashboard;