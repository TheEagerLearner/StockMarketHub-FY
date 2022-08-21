import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Header } from "react-navigation-stack";
import { AntDesign } from "@expo/vector-icons";
//import { useHeaderHeight } from "react-navigation-stack";

/*
Usage
        <TitleBar 
            title="Dashboard"
            onPress={()=>{console.log("Tapped")}}
            lightTheme={true}
            style={{
                color:'#fff',
                
            }}
        />
    
*/

const TitleBar = ({ title, onPress, lightTheme, style }) => {
    // const headerHeight = useHeaderHeight();
    return (
        <View style={[style, stylesheet.appBar]}>
            <TouchableOpacity onPress={onPress}>
                <AntDesign
                    name="arrowleft"
                    size={30}
                    color={lightTheme ? "black" : "white"}
                    style={{ marginLeft: 10 }}
                />
            </TouchableOpacity>
            <Text style={[{ color: lightTheme ? "black" : "white" }, stylesheet.titleStyle]}>
                {title}
            </Text>
        </View>
    );
};

const stylesheet = StyleSheet.create({
    appBar: {
        height: Header.HEIGHT, //-StatusBar.currentHeight,
        //borderWidth:2,
        //marginTop:StatusBar.currentHeight,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    titleStyle: {
        position: "absolute",
        right: 10,
        fontSize: 20,
        fontWeight: "bold"
    }
});

export default TitleBar;