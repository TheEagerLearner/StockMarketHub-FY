//required imports
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

//screens
import SplashScreen from "./src/screens/SplashScreen";
import Home from "./src/screens/Home";
import Dashboard from "./src/screens/Dashboard";

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
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;


