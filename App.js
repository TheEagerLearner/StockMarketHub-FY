//required imports
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

//screens
import SplashScreen from "./src/screens/SplashScreen";
import Home from "./src/screens/Home";
import Dashboard from "./src/screens/Dashboard";

//icon-screen
import Profile from "./src/screens/Icon_screens/Profile";
import About from "./src/screens/Icon_screens/About";
import Wishlist from './src/screens/Icon_screens/Wishlist';

//Authentication
import Register from "./src/screens/Authentication/Register";
import Login from "./src/screens/Authentication/Login";

//Home-Screens
import News from "./src/screens/Home-Screens/News";
import Analysis from "./src/screens/Home-Screens/Analysis";


const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        
                <Stack.Screen name="SplashScreen" component={SplashScreen} />   
                <Stack.Screen name="Home" component={Home} />   
                <Stack.Screen name="Dashboard" component={Dashboard}/>  
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="News" component={News} />
                <Stack.Screen name="Analysis" component={Analysis} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="About" component={About} />
                <Stack.Screen name="Wishlist" component={Wishlist} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;


