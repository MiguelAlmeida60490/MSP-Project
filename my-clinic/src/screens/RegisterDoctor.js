import { View, Text, Pressable, ActivityIndicator, TextInput } from "react-native";
import React, { useState } from "react";
import { styles } from "../styles/styles";
import { app } from "../services/firebaseConfig";
import { signUp } from "../services/auth";
import { useNavigation } from "@react-navigation/native";

const RegisterDoctor = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState("");

  const navigation = useNavigation();

  const doSignUp = async () => {
    setLoading(true);
    try {
      const user = await signUp(email, password);
      if (user) {
        handleAddUser("doctor");
      }
      setLoading(false);
      navigation.navigate("Home");
      alert("Doctor " + name + " registered with success");
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

  const handleAddUser = (role) => {
    app.firestore().collection("users").doc(email).set({
      name,
      email,
      role,
      type
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Doctor Info</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(name) => setName(name)}
      ></TextInput>
       <TextInput
        style={styles.input}
        placeholder="Type"
        value={type}
        onChangeText={(type) => setType(type)}
        secureTextEntry={true}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
      ></TextInput>
      {loading ? (
        <ActivityIndicator color="#0000ff" size="large" />
      ) : (
        <View>
          <Pressable style={styles.pressable} onPress={doSignUp}>
            <Text style={styles.mainText}>Register</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default RegisterDoctor;
