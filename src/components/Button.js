import React  from "react";
import {Text,TouchableOpacity,StyleSheet} from 'react-native';

const Button = ({title,onPress,style,titleStyle}) => {

    return(
        <TouchableOpacity
            style={[stylesheet.container,style]}
            onPress={onPress}
        >
            <Text style={[stylesheet.title_style,titleStyle]}>{title}</Text>
        </TouchableOpacity>
    );
}

const stylesheet = StyleSheet.create({
    container:{
        backgroundColor:'#CCA8E9',
        padding:12,
        borderRadius:12,
        elevation:10
    },
    title_style:{
        textAlign:"center",
        color:'#fff',
        fontSize:24,
        fontWeight:"bold"
        
    }
});

export default Button;