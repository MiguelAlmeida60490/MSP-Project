import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../styles/styles";
import { signOut } from "../services/auth";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/authContext";

const Profile = () => {
  const navigation = useNavigation();
  const { currentUser, userData } = useAuth();

  const handleLogOut = () => {
    signOut();
    navigation.navigate("FirstPage");
  };

  const ProfileContent = () => {
    if (userData.role === "client") {
      return (
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Payments")}
          >
            <Text style={styles.buttonText}>Payments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogOut}>
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (userData.role === "doctor") {
      return (
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={handleLogOut}>
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (userData.role === "admin") {
      return (
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={handleLogOut}>
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <ProfileContent />
    </View>
  );
};

export default Profile;
