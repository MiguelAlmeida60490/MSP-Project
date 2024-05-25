import { View, Text } from "react-native";
import React from "react";
import { styles } from "../styles/styles";

const PatientInfo = ({ route }) => {
    const { name, email } = route.params.item;
 
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>Nome: {name}</Text>
        <Text style={styles.text}>Email: {email}</Text>
      </View>
    </View>
  );
};

export default PatientInfo;
