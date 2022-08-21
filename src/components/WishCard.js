import React from 'react';
import {View,StyleSheet,Text,TouchableOpacity} from 'react-native';


/*
    USAGE
           <FocusCard 
                name={'Sail.ns'}
                open={100}
                current={100.1}
                buy={true}
           />
*/

const WishCard = ({name,open,current,buy,onPress}) =>{

    return(
        <TouchableOpacity 
            style={stylesheet.cardStyle}
            onPress={onPress}
        >
            <Text style={stylesheet.nameStyle}>{name}</Text>


          
        
        </TouchableOpacity>
    );
}

const stylesheet = StyleSheet.create({
    cardStyle:{
        padding:10,
        paddingBottom:18,
        borderWidth:0,
        borderRadius:10,
        margin:10,
        //marginTop:100,
        backgroundColor:'#CCA8E9',
        shadowColor:'#A5a9ff',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 24,
        width:'95%',
        alignItems:'center'
    },
    nameStyle:{
        marginLeft:15,
        fontWeight:'bold',
        marginBottom:0,
        fontSize:18,
        marginTop:10,
        
    },
    detailStyle:{
        flexDirection:'row',
        marginLeft:5,
        
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:10,
        marginRight:40,
    },
    

});

export default WishCard;