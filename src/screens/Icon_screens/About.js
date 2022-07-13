import { View, StyleSheet, Text, Image, ScrollView} from 'react-native'
import React from 'react'

const About = () => {
  return (
    <View style={style.container} >
      <Image  source={require("../../../assets/bg1.jpg")} style={style.bgStyle}/>
      <Text style={style.text}>About Us</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.info}>
            <Text style={style.text2}>With regards to Indian stock exchanges, just a minority of individuals who take care of their essentials and details appropriately put resources into the stock exchange while others are reluctant to contribute. The most widely recognized justification for Indians to avoid stock exchange is because of monetary ignorance, on account of which many individuals favor customary venture strategies which offer sure chance additions.
            
            </Text>
            <Text  style={style.text2}>The continuous growth of first-time investors over trading platforms due to the ease of getting into stock market and trading in stocks with no experience or knowledge in the area of investments at all, thus making the market more unstable and riskier. And so, we hope to help 
beginners take better decisions by combining both the technical and sentimental analysis which is obtained by constructing a hybrid prediction model which will consider all the factors that affect the stock price i.e., emotions, economy, expectations and earnings, and also providing them an all-in-one platform to get all the share related information they need.
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
        height: "100%",
        margin: 10,
    },
    text: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#1B2430",
        letterSpacing: 2,
        marginTop:18,
        textAlign:'center'
    },
    info: {
    },
    text2: {
        fontSize: 20,
        color: "black",
        padding: 10,
        opacity: 1,
        fontWeight: "400",
        textAlign:'center'
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