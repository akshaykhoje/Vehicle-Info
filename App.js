import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VehicleInfo from "./Components/VehicleInfo";
import Vaahan from "./Components/Vaahan";
import Camera from "./Components/Camera";
import ImageScreen from "./Components/ImageScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="VehicleInfo">
        <Stack.Screen options={{headerShown:false}} name="VehicleInfo" component={VehicleInfo} />
        <Stack.Screen name="Vaahan" component={Vaahan} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="ImageScreen" component={ImageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
