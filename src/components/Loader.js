import React from 'react';
import { View,StyleSheet,Text,Image } from 'react-native';

const Loader = ({style}) => {

    return(
        <View style = {[stylesheet.container,style]}>

            <Image 
                style={stylesheet.loader}
                source={require('./../../assets/loader.gif')}
            />

        </View>
    );

}

const stylesheet = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        position:'absolute',
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
        opacity:0.86
    },
    loader:{
        height:'50%',
        width:'90%'
    }
});
export default Loader;