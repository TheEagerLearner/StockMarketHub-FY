import React from 'react'
import { View, StyleSheet, Text, Image, ScrollView,StatusBar} from 'react-native'

import TitleBar from '../../components/TitleBar'

const About = ({navigation}) => {
  return (
    <View style={style.container} >

        <StatusBar barStyle="dark-content" backgroundColor="#fff" />


        <TitleBar 
            title="About Us 🧐"
            onPress={()=>{
                navigation.goBack();
            }}
            lightTheme={true}
            style={{
                color:'#fff',
               
                
            }}
        />

  
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.info}>
            <Text style={style.text}>With regards to Indian stock exchanges, just a minority of individuals who 
            take care of their essentials and details appropriately put resources into the stock exchange while 
            others are reluctant to contribute. The most widely recognized justification for Indians to avoid stock 
            exchange is because of monetary ignorance, on account of which many individuals favor customary venture strategies which 
            offer sure chance additions.
            </Text>

            <Text  style={style.text}>The continuous growth of first-time investors over trading platforms due 
            to the ease of getting into stock market and trading in stocks with 
            no experience or knowledge in the area of investments 
            at all, thus making the market more unstable and riskier. And so, we hope to help 
        beginners take better decisions by combining both the technical and 
        sentimental analysis which is obtained by constructing a hybrid prediction 
        model which will consider all the factors that affect the stock price i.e., 
        emotions, economy, expectations and earnings, and also providing them an all-in-one platform to get 
        all the share related information they need.
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

const style = StyleSheet.create({
    bgStyle: {
        height: "100%",
        position: "absolute",
    },
    container: {
       flex:1,
       backgroundColor:'#fff'
    },
    text: {
      fontSize: 18,
      color: "black",
      padding: 10,
      opacity: 1,
      fontWeight: "400",
      textAlign:'center'
    },
    info: {
      padding:10
    }
    
})

export default About

/**
 * <ImageBackground source={require('../../assets/bg.jpg')}>
            <Text>
                This is my stock market hub
            </Text>
      </ImageBackground>
      <Image  source={require("../../assets/bg.jpg")} style={{ height: 1000 }} resizeMode="cover"/>
 */