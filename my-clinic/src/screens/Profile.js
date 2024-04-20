import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../styles/styles";
import { signOut } from "../services/auth";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation();

  const handleLogOut = () => {
    signOut();
    navigation.navigate("FirstPage");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button} onPress={handleLogOut}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
