import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { signIn, signUp } from "../services/auth";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/styles";
import { TextInput } from "react-native-gesture-handler";
import { app } from "../services/firebaseConfig";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState("");
  const [isDoctor, setIsDoctor] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const navigation = useNavigation();

  const signUp = async () => {
    setLoading(true);
    try {
      if (isDoctor) {
        await signUp(email, password);
        handleAddDoctor();
        setLoading(false);
        navigation.navigate("Home");
      } else if (isUser) {
        await signUp(email, password);
        handleAddUser();
        setLoading(false);
        navigation.navigate("Home");
      } else {
        alert("No user type selected");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already used");
      } else if (error.code === "auth/weak-password") {
        alert("Weak password. Please choose a stronger password");
      } else {
        alert("Register error: " + error.message);
      }
    }
  };

  return (
    <View>
      <Text>Register</Text>
    </View>
  );
};

export default Register;
