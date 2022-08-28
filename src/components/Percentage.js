import React from 'react';
import {View,StyleSheet,Text} from 'react-native'
import ProgressCircle from 'react-native-progress-circle';

const Percentage = ({buy,title,text,percent}) => {
    
    console.log({
        "buy":buy,
        "title":title,
        "text":text,
        "precent":percent
    });

    return(
        <View style={stylesheet.main}>
        <Text style={{
            textAlign:'center',
            marginTop:10,
            fontWeight:'bold'

        }}>{title}</Text>
        <View style={stylesheet.container}>
        
        <ProgressCircle
            percent={parseInt(percent)}
            radius={50}
            borderWidth={8}
            color={buy?"#3CCF4E":"#E64848"}
            shadowColor="#fff"
            bgColor={buy?"#CFE8A9":"#FFC090"}
        >
            <Text style={{ fontSize: 18 }}>{`${percent}`}</Text>
        </ProgressCircle>
        <Text
            style={stylesheet.textStyle}
        >{text}</Text>
        </View>
        </View>
    );
}

const stylesheet = StyleSheet.create({
    main:{
        marginHorizontal:20,
        marginBottom:20,
        backgroundColor:'#fff',
        padding:20,
        alignSelf:'center',
        elevation:8,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        paddingTop:0
    },
    container:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:20

    },
    textStyle:{
        marginHorizontal:10,
        width:'70%'
    }
});

export default Percentage;