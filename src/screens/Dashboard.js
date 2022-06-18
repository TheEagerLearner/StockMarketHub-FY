import React,{useState} from 'react';
import {View,StyleSheet,Text,TextInput} from 'react-native';
import { AsyncStorage } from 'react-native';

const Dashboard = ({navigation}) => {

    const [ticker,setTicker] = useState('');

        const retrieveData = async () => {
            try {
              const value = await AsyncStorage.getItem('username');
              if (value !== null) {
                // We have data!!
                console.log(value);
                setTicker(value);
              }
            } catch (error) {
              console.log(error);
            }
          };

          retrieveData();

    return(
        <View style={stylesheet.container}>
            <Text>Hello {ticker}</Text>
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

export default Dashboard;