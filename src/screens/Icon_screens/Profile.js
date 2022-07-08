import { View, Text, TouchableOpacity, StyleSheet,AsyncStorage } from 'react-native'
import React, {useState, useEffect} from 'react'
import {Card} from 'react-native-shadow-cards';
import { auth,database } from '../../features/Firebase/firebase';
import Button from '../../components/Button';

const Profile = ({navigation}) => {

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

    retrieveData();
    
    useEffect(() => {
      const interval = setInterval(() => {
      const random = Math.floor(Math.random() * 16)
      setQuote(quotes[random])
      }, 10000);
      return () => clearInterval(interval)
  }, [setQuote])


  return (
    
    <View style={style.container}>
      <Text style={style.txtProfile}>Profile 🙋‍♂️</Text>
      <View style={style.view1}>

        <View style={{
          width:'100%'
        }}>
          <Text style={style.name}>{`Name ${name}`}</Text>
          <Text style={style.name}>{`Email ${email}`}</Text>
          
      <Button 
        style={{
          marginTop:100
        }}
        title={"logout"}
        onPress={()=>{
          logout();
        }}
      />
        </View>
        <View style={style.quoteBg}>
          

          <Text style={style.headQuote}>Quote for the Day :</Text>
            <Text style={style.txtQuote}>{quote}</Text>
          
        </View>
      </View>
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
      marginTop:30
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
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 0,
    },
    buttontext: {
       padding: 5,
       fontSize: 25  
    },
    name: {
      marginTop: 10,
      fontSize: 26,
      //borderWidth: 2,
      padding: 10,
      borderRadius: 8,
      
    },
    quoteBg: { 
      position: "absolute",
      bottom: 100,
      margin: 10,
      borderTopLeftRadius: 25,
      borderBottomRightRadius: 25,
      width:'100%',
      elevation:2,
      padding:10
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