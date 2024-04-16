import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./src/screens/Home";
import Header from "./src/components/Header";
import FirstPage from "./src/screens/FirstPage";
import LogIn from "./src/screens/LogIn";
import Register from "./src/screens/Register";
import MedicalAppointment from "./src/screens/MedicalAppointment"
import { Ionicons } from "@expo/vector-icons";
import { AuthProvider, useAuth } from "./src/contexts/authContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={FirstPage}
        name="FirstPage"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={Register}
        name="Register"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={LogIn}
        name="LogIn"
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Tab.Screen
        component={Home}
        name="Home"
        options={{
          headerTitle: () => <Header name="MyClinic" />,
          headerStyle: {
            backgroundColor: "#4c00b0",
            height: 120,
          },
          tabBarActiveTintColor: "#000000",
          tabBarIcon: () => {
            return <Ionicons name="home" size={30} color="#874FFF" />;
          },
        }}
      />
      <Tab.Screen
        component={MedicalAppointment}
        name="MedicalAppointment"
        options={{
          headerTitle: () => <Header name="MyClinic" />,
          headerStyle: {
            backgroundColor: "#4c00b0",
            height: 120,
          },
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { currentUser } = useAuth();

  return <>{currentUser ? <TabNavigator /> : <StackNavigator />}</>;
};
