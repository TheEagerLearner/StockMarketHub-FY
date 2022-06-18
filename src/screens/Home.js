import React,{useState} from 'react';
import {View,StyleSheet,Text,TextInput} from 'react-native';
import { AsyncStorage } from 'react-native';

const Home = ({navigation}) => {

    const [ticker,setTicker] = useState('');

    const storeData = async () => {
        try {
          await AsyncStorage.setItem(
            'ticker',
            ticker
          );
          navigation.navigate('Dashboard');
        } catch (error) {
          console.log(error);
        }
      };

    return(
        <View style={stylesheet.container}>
            <Text>Home</Text>
            <TextInput 
                placeholder='Enter ticker name'
                style={stylesheet.textinput}
                value={ticker}
                onChangeText={(text)=>{setTicker(text);}}
                onEndEditing={()=>{
                    storeData();
                    
                }}
            />
        </View>
    );
}

const stylesheet = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    textinput:{
        borderWidth:1,
        padding:10,
        width:'80%'
    }
});

export default Home;