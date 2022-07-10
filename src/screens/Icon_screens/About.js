import { View, StyleSheet, Text, Image, ScrollView} from 'react-native'
import React from 'react'

const About = () => {
  return (
    <View style={style.container} >
      <Image  source={require("../../../assets/bg1.jpg")} style={style.bgStyle}/>
      <Text style={style.text}>About Us</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.info}>
            <Text style={style.text2}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical 
            Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, 
            looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical 
            literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" 
            (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the 
            Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of 
            Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" 
            by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
            Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" 
            by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
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
        marginLeft: 20,
        marginTop:18
    },
    info: {
    },
    text2: {
        fontSize: 20,
        color: "black",
        padding: 10,
        opacity: 1,
        fontWeight: "400",
        textAlign:'justify'
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