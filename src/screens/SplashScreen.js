import React from 'react';
import {View,StyleSheet,Text,Image } from 'react-native';
import { AsyncStorage } from 'react-native';


const SplashScreen = ({navigation}) => {
    
    //checks if user has logged in before
    const checkLoggedIn = async () => {
        try {
            //await AsyncStorage.setItem('loggedIn','false');
            const value = await AsyncStorage.getItem('loggedIn');
            if(value!=null){
                console.log(`splash screen value => ${value}`);    
                if (value.localeCompare('true')===0){
                    console.log('Dashboard');
                    navigation.navigate('Dashboard');
                }
                else{
                   navigation.navigate('Register');
                }
            }
            else{
                navigation.navigate('Register');
            }
        }
            catch(error){
                console.log(`err1=>${error}`);
            }

        }

    setTimeout(()=>{

        checkLoggedIn();
    
    },1500);

    return(
        <View style={stylesheet.container}>

            <Image 
                style={{

                    alignSelf:'center',
                    flex:1
                    
                }}
                source={require('./../../assets/splash.png')} />


        </View>
    );
}

const stylesheet = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',

    }
});

export default SplashScreen;