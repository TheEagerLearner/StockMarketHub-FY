import React from 'react';
import {View,StyleSheet,Text} from 'react-native'
import ProgressCircle from 'react-native-progress-circle';

const Percentage = ({text,percent}) => {
    
    const toBuy = true;

    return(
        <View style={stylesheet.container}>
        <ProgressCircle
            percent={parseInt(percent)}
            radius={50}
            borderWidth={8}
            color={toBuy?"#3CCF4E":"#E64848"}
            shadowColor="#fff"
            bgColor={toBuy?"#CFE8A9":"#FFC090"}
        >
            <Text style={{ fontSize: 18 }}>{`${percent}`}</Text>
        </ProgressCircle>
        <Text
            style={stylesheet.textStyle}
        >{text}</Text>
        </View>
    );
}

const stylesheet = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:20,
        marginBottom:20,
        backgroundColor:'#fff',
        padding:20,
        alignSelf:'center',
        elevation:8,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    textStyle:{
        marginHorizontal:10,
        width:'70%'
    }
});

export default Percentage;