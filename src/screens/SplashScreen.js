import React from 'react';
import {View,StyleSheet,Text} from 'react-native';

const SplashScreen = ({navigation}) => {

    setTimeout(()=>{

        navigation.navigate("Home");
    
    },1500);

    return(
        <View style={stylesheet.container}>
            <Text>Splash Screen</Text>
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

export default SplashScreen;