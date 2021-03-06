import React, { useState } from 'react';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from "../Screens/Authentications/LoginScreen";
import StarterScreen from "../Screens/Authentications/StarterScreen";
import DashboardScreen from "../Screens/HomeScreens/DashboardScreen";
// import RegistrationScreen from "../Screens/AuthenticationScreen/RegistrationScreen";
// import HomeScreen from "../Screens/HomeScreen/HomeScreen";

const Stack = createStackNavigator();


 export const  AppNavigator = (props) => {
    //  const { user } = props
    return (
        <NavigationContainer>
                <Stack.Navigator
                    initialRouteName={'DashboardScreen'}
                    headerMode='none'
                >
                   
                    <Stack.Screen name='LoginScreen' component={LoginScreen} />
                    <Stack.Screen name="StarterScreen" component={StarterScreen} />
                     <Stack.Screen name='DashboardScreen' component={DashboardScreen} />
                    {/*  <Stack.Screen name='RegistrationScreen' component={RegistrationScreen} /> */}
            
                </Stack.Navigator> 
        </NavigationContainer>
    )
}

export default AppNavigator;