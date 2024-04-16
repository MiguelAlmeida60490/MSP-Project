import React from 'react';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import Header from './src/components/Header';
import FirstPage from './src/screens/FirstPage';
import LogIn from './src/screens/LogIn';
import Register from './src/screens/Register';
import { Ionicons } from '@expo/vector-icons';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={Home}
          name="Home"
          options={{
            headerTitle: () => <Header name="Home"/>,
            headerStyle: {
              backgroundColor: "#4c00b0",
              height: 120
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
