import React, { useEffect, useState } from 'react';
import {View,StyleSheet,TextInput,KeyboardAvoidingView,TouchableOpacity,Text} from 'react-native';
import Button from '../../components/Button';
import { AsyncStorage } from 'react-native';
import { auth } from '../../features/Firebase/firebase';

const Register = ({navigation}) => {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const RegisterUser = () => {
        auth.createUserWithEmailAndPassword(email,password)
            .then((userCred)=>{
                var user = userCred.user;
                console.log(user);
                navigation.navigate('Dashboard');
            })
            .catch((error)=>{
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
            });
    }
    
    const checkLoggedIn = async () => {
        try {
            const value = await AsyncStorage.getItem('loggedIn');
            if(value!=null){
                console.log(value);    
                if (value.localeCompare('true')===0){
                    navigation.navigate('Dashboard');
                }
            }
        }
            catch(error){
                console.log(`err1=>${error}`);
            }

        }

    useEffect(()=>{
        checkLoggedIn();
    },[]);


    const setLoggedIn = async () => {
        try{await AsyncStorage.setItem(
            'loggedIn',
            true
            )
        }
        catch(error){
            console.log(`err2=>${error}`);
            
        }
    }
        

    const storeData = async () => {
        try {
          await AsyncStorage.setItem(
            'username',
            name
          );
          setLoggedIn();
          RegisterUser();
        } catch (error) {
            console.log(`err3=>${error}`);
            
        }
      };


  

    return(
        <KeyboardAvoidingView style={stylesheet.container}>
            <View style={stylesheet.inside_container}>
                
            <TextInput 
                    style={stylesheet.textInput}
                    placeholder='Enter name'
                    onChangeText={(text)=>{
                        setName(text);
                    }}
                />

                <TextInput 
                    style={stylesheet.textInput}
                    placeholder='Enter email'
                    keyboardType='email-address'
                    onChangeText={(text)=>{
                        setEmail(text);
                    }}
                />
                
                <TextInput 
                    style={stylesheet.textInput}
                    placeholder='Enter password'
                    onChangeText={(text)=>{
                        setPassword(text);
                    }}
                    secureTextEntry
                />
                
                <Button 
                    style={stylesheet.btn_style}
                    titleStyle={{
                        color:'#fff'
                    }}
                    title={'Register'}
                    onPress={()=>{
                        console.log(name);
                        console.log(email);
                        console.log(password);
                        console.log('Storing data ...');
                        
                        storeData();
                    }}
                />
                
                <TouchableOpacity
                    onPress={()=>{
                        navigation.navigate('Login')
                    }}
                >
                    <Text style={stylesheet.btm_text}>Already have an account? Login</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    );
}

const stylesheet = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    inside_container:{
        width:'100%',
        padding:10
    },
    textInput:{
        borderWidth:1,
        padding:12,
        borderRadius:10,
        marginHorizontal:16,
        marginVertical:12,
    },
    btn_style:{
        marginHorizontal:12,
        marginTop:24
    },
    btm_text:{
        textAlign:'center',
        marginTop:10,
        fontSize:16
    }
});

export default Register;