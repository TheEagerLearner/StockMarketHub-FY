import React from 'react';
import { View,StyleSheet,Text,Image } from 'react-native';

const Loader = ({style,link}) => {

    return(
        <View style = {[stylesheet.container]}>

        <View style={[stylesheet.card,style]}>
            <Image 
                style={stylesheet.loader}
                source={link}
            />
        </View>

        </View>
    );

}

const stylesheet = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        position:'absolute',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
        opacity:0.86
    },
    loader:{
        height:'96%',
        width:"96%",
    },
    card:{
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:10,
        height:'30%',
        width:'90%',
        borderRadius:20,
        backgroundColor:'#fff',
        elevation:8
    }
});
export default Loader;