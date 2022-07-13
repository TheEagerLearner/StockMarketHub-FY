import { View, Text, TouchableOpacity, StyleSheet,AsyncStorage,Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import {Card} from 'react-native-shadow-cards';
import { auth,database } from '../../features/Firebase/firebase';
import Button from '../../components/Button';

const Profile = ({navigation}) => {


  const [name,setName] = useState('');
  const [email,setEmail] = useState('');

  const retrieveData = async () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
  
        var uid = user.uid;
        //setUid(uid);
        // ...
        const dbRef = database.ref();
        dbRef.child("users").child(user.uid).get().then((snapshot) => {
          if (snapshot.exists()) {
            var user=snapshot.val();
            console.log(snapshot.val());
            setName(user.username);
            setEmail(user.email);

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

    const logout = async () => {
      try{
        await AsyncStorage.setItem('loggedIn','false');
        navigation.navigate('Register');
      }
      catch(err){
        console.log("hmmmmmmm =====> "+err);
      }
    }


    
    useEffect(() => {
      retrieveData();
  }, [])


  return (
    
    <View style={style.container}>
      <Text style={style.txtProfile}>Profile 🙋‍♂️</Text>
      <View style={style.view1}>

        <View style={{
          width:'100%'
        }}>
          <Text style={style.name}>{`Name: ${name}`}</Text>
          <Text style={style.name}>{`Email: ${email}`}</Text>
          

        </View>

        <Image 
        style={{
          width:400,
          height:400,
          alignSelf:'center',
          marginTop:40
        }}
        
        source={require('./../../../assets/hello.gif')}
      />

      </View>
      <Button 
        style={{
          position:'absolute',
          alignSelf:'center',
          bottom:80,
          width:300
        }}
        title={"logout"}
        onPress={()=>{
          logout();
        }}
      />
    </View>
  )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        flexDirection: "column",
    },
    txtProfile: {
      fontSize: 32,
      fontWeight: "bold",
      letterSpacing: 4,
      marginTop:30,
      marginLeft:20
    },
    view1: {
      alignItems: "center",
      margin: 10,
      flex: 1,
      flexDirection: "column",
    },
    button: {
        height: 50,
        width: 200,
        borderColor: "#1B2430",
        borderWidth: 2,
        borderRadius: 8,
        position: "absolute",
        bottom: 0,
    },
    buttontext: {
       padding: 5,
       fontSize: 25  
    },
    name: {
      marginTop: 10,
      fontSize: 22,
      //borderWidth: 2,
      padding: 10,
      borderRadius: 8,
      
    }
})

export default Profile

/*
<View style={style.view1}>
        <TouchableOpacity style={style.button}>
          <Text style={style.buttontext}>Log Out</Text>
        </TouchableOpacity>
      </View>

      <Text style={style.txtQuote}>{quote}</Text>
*/