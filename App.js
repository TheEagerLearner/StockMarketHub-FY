//required imports
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

//screens
import SplashScreen from "./src/screens/SplashScreen";
import Home from "./src/screens/Home";
import Dashboard from "./src/screens/Dashboard";


const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />   
                <Stack.Screen name="Home" component={Home} />   
                <Stack.Screen name="Dashboard" component={Dashboard}/>  
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;


