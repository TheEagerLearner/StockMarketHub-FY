import React from 'react';
import { View,StyleSheet,Text } from 'react-native';

const Profile = ({navigation}) => {

    return(
        <View style={stylesheet.container}>
            <Text>Profile</Text>
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

export default Profile;