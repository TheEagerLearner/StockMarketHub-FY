import React,{useState,useEffect} from 'react';
import {View,StyleSheet,Text,TouchableOpacity,KeyboardAvoidingView,TextInput,Image,ToastAndroid,Keyboard} from 'react-native';
import Button from '../../components/Button';
import { auth } from '../../features/Firebase/firebase';
import { AsyncStorage } from 'react-native';
import Loader from '../../components/Loader';

const Login = ({navigation}) => {

    const [uid,setUserid] = useState('');
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    
    const [loader,setLoader] = useState(false);

    //logs in users
    const loginUser =  () =>{
        setLoader(true);
        auth.signInWithEmailAndPassword(email,password)
            .then((userCred)=>{
                var user = userCred.user;
                setUserid(user.uid);
                setLoggedIn();
                navigation.navigate('Dashboard');
            })
            .catch((error)=>{
                setLoader(false);
                ToastAndroid.show(error.message,4000);
            });
    }
    

        //sets the user loggedin flag as true
        const setLoggedIn = async () => {
            try{await AsyncStorage.setItem(
                'loggedIn',
                'true'
            )
            
        }
        catch(error){
            console.log(`err2=>${error}`);
            
        }
    }
    
    
        return(
        <KeyboardAvoidingView style={stylesheet.container}>

                <Image 
                    style={{
                        width:250,
                        height:250,
                        position:'absolute',
                        top:50
                        
                    }}
                    source={require('./../../../assets/lol.png')} 

                />
            <View style={stylesheet.inside_container}>
                


                <TextInput 
                    style={stylesheet.textInput}
                    placeholder='Enter email'
                    keyboardType='email-address'
                    onChangeText={(text)=>{
                        setEmail(text);
                    }}
                    autoCapitalize={"none"}
                />
                
                <TextInput 
                    style={stylesheet.textInput}
                    placeholder='Enter password'
                    onChangeText={(text)=>{
                        setPassword(text);
                    }}
                    secureTextEntry
                    autoCapitalize={"none"}
                />
                
                <Button 
                    style={stylesheet.btn_style}
                    titleStyle={{
                        color:'#fff'
                    }}
                    title={'Login'}
                    onPress={()=>{
                        Keyboard.dismiss();
                        console.log(name);
                        console.log(email);
                        console.log(password);
                        console.log('Storing data ...');
                        
                        loginUser();
                    }}
                />

                <TouchableOpacity
                    onPress={()=>{
                        navigation.navigate('Register')
                    }}
                >
                    <Text style={stylesheet.btm_text}>Don't have an account? Register</Text>
                </TouchableOpacity>
                
            </View>
            {loader?
        <Loader 
          link={require('./../../../assets/login_loader.gif')}
          style={{
            backgroundColor:'#8EB5EE'
          }}
        />:null}
        </KeyboardAvoidingView>
    );
}

const stylesheet = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    inside_container:{
        width:'100%',
        padding:10,
        marginTop:80
    },
    textInput:{
        borderWidth:0,
        padding:12,
        borderRadius:10,
        marginHorizontal:16,
        marginVertical:12,
        backgroundColor:'#fff',
        elevation:8
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

export default Login;