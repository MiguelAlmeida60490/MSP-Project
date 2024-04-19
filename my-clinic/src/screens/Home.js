import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/authContext";
import { styles } from "../styles/styles";

const Home = () => {
  const navigation = useNavigation();
  const { currentUser, userData } = useAuth();

  const HomeContent = () => {
    if (userData.role === "client") {
      return (
        <View style={styles.container}>
          <Text>
            User Signed in: {userData.email}, {userData.role}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("MedicalAppointment")}
          >
            <Text style={styles.buttonText}>Schedule Medical appointment</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (userData.role === "doctor") {
      return (
        <View>
          <Text>
            User Signed in: {userData.email}, {userData.role}
          </Text>
        </View>
      );
    }
    if (userData.role === "admin") {
      return (
        <View style={styles.container}>
          <Text style={{ marginBottom: 30 }}>
            User Signed in: {userData.email}, {userData.role}
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text
              style={styles.buttonText}
              onPress={() => navigation.navigate("RegisterDoctor")}
            >
              Register Doctor
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {userData ? (
        <HomeContent />
      ) : (
        <ActivityIndicator color="#0000ff" size="large" />
      )}
    </View>
  );
};

export default Home;
