import React, { useState } from 'react';
import {View,StyleSheet,Text,TouchableOpacity} from 'react-native';

/*
        <NewsCard 
            news={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum More.'}
        />
*/

const NewsCard=({news,onPress})=>{


    
    return(
    <TouchableOpacity 
        style={stylesheet.mainStyle}
        onPress={onPress}
    >
    
        <Text style={{
            color:'black',
            fontSize:16,
        }}>{news}</Text>

    </TouchableOpacity>
    );
}

const stylesheet=StyleSheet.create({
mainStyle:{
    borderLeftWidth:3,
    justifyContent:'center',
    padding:10,
    width:'100%',
    //marginTop:100,
    borderColor:'#A5A9FF',
    margin:10,
    
}
});


export default NewsCard;