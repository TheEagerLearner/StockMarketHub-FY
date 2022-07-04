import React from 'react';
import { View,StyleSheet,Text } from 'react-native';

const Wishlist = ({navigation}) => {

    return(
        <View style={stylesheet.container}>
            <Text>Wishlist</Text>
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

export default Wishlist;