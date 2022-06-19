import React,{useEffect, useState} from 'react';
import {View,StyleSheet,Text,TextInput} from 'react-native';
import { AsyncStorage } from 'react-native';
import { auth, database } from '../features/Firebase/firebase';

const Dashboard = ({navigation}) => {

    const [uid,setUid] = useState('');
    const [name,setName] = useState('user');

        const retrieveData = async () => {
          auth.onAuthStateChanged((user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              var uid = user.uid;
              setUid(uid);
              // ...
            } else {
              // User is signed out
              // ...
              console.log('No user present');
            }
          });
          };

          const getData = () =>{
            const dbRef = database.ref();
            dbRef.child("users").child(uid).get().then((snapshot) => {
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
          }

          useEffect(()=>{
            
            retrieveData();
            getData();
            
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