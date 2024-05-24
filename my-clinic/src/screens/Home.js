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
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("MedicalAppointment")}
          >
            <Text style={styles.buttonText}>Schedule Medical Appointment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("MedicalExam")}
          >
            <Text style={styles.buttonText}>Schedule Medical Exam</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CheckIn")}
          >
            <Text style={styles.buttonText}>Check In</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (userData.role === "doctor") {
      return (
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={(userData) => navigation.navigate("DoctorPatients")}
          >
            <Text style={styles.buttonText}>My patients</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (userData.role === "admin") {
      return (
        <View style={styles.container}>
          <Text style={{ marginBottom: 30 }}></Text>
          <TouchableOpacity style={styles.button}>
            <Text
              style={styles.buttonText}
              onPress={() => navigation.navigate("RegisterDoctor")}
            >
              Register Doctor
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text
              style={styles.buttonText}
              onPress={() => navigation.navigate("AddPrices")}
            >
              Add New Price
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text
              style={styles.buttonText}
              onPress={() => navigation.navigate("AddInsurances")}
            >
              Add New Insurance
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
