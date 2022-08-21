import React from 'react';
import { View,StyleSheet,TextInput } from 'react-native';

const SearchBar = ({onChangeText,onEndEditing}) => {


    return(
        <View style={stylesheet.shadow}>
            <TextInput 
                    style = {stylesheet.container}
                    placeholder={'Enter Stock Ticker'}
                    onChangeText={onChangeText}
                    onEndEditing={onEndEditing}
            />
       </View>
    );
}

const stylesheet = StyleSheet.create({
    container:{
        width:'96%',
        padding:16,
        borderRadius:16,
        alignSelf:'center',
        marginTop:50,
        borderWidth:0,
        backgroundColor:'white',
        elevation:6
           
    
    },
    shadow:{
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        
    }
});

export default SearchBar;