import { View, Text, Button, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"fff"
  }
})
