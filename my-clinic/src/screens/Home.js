import { View, Text, Button, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/authContext";
import { styles } from "../styles/styles";

const Home = () => {
  const navigation = useNavigation();
  const { currentUser, userData } = useAuth();

  return (
    <View style={styles.container}>
      {userData ? (
        <Text>{userData.email}</Text>
      ) : (
        <ActivityIndicator color="#0000ff" size="large" />
      )}
    </View>
  );
};

const HomeContent = () => {
  if (userData.role === "client") {
    return <View></View>;
  }
  if (userData.role === "doctor") {
    return <View></View>;
  }
  if (userData.role === "admin") {
    return <View></View>;
  }
};

export default Home;
