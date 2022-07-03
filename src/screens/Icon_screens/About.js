import React from 'react';
import { View,StyleSheet,Text } from 'react-native';

const About = ({navigation}) => {

    return(
        <View style={stylesheet.container}>
            <Text>About</Text>
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

export default About;