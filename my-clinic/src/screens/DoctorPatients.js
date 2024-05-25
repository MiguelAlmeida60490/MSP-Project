import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { app } from "../services/firebaseConfig";

const DoctorPatients = ({ route }) => {
  const navigation = useNavigation();
  const [listPatients, setListPatients] = useState([]);
  const [doctor, setDoctor] = useState([]);

  console.log(route.params.userData);

  return (
    <View style={styles.container}>
      <View style={styles.buttonView}></View>
    </View>
  );
};

export default DoctorPatients;
