import React from 'react';
import { View,StyleSheet,Text,TouchableOpacity } from 'react-native';


const DashIcons = ({navigation,title,child,onPress}) => {

    return(
        <TouchableOpacity 
            style={stylesheet.container}
            onPress={onPress}
        >
            <View style={stylesheet.icon_style}>
                {child}
            </View>
            <Text style={stylesheet.title_style}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const stylesheet = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        padding:6
    },
    icon_style:{

    },
    title_style:{
        fontWeight:'bold',
        marginTop:4,
    }
});

export default DashIcons;