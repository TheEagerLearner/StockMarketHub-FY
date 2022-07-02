import React from 'react';
import { View,StyleSheet,Text } from 'react-native';

const Analysis = ({navigation}) => {

    

    return(
        <View style={stylesheet.container}>
            <Text>Analysis zai re ?</Text>
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

export default Analysis;