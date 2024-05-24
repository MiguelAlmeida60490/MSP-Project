import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { app } from "../services/firebaseConfig";

const DoctorPatients = (props) => {
  const navigation = useNavigation();
  const [listPatients, setListPatients] = useState([]);

  const getDoctor = () => {
        app
        .firestore()
        .collection("users")
        .doc(props.id)
        .get();
  };    

  useEffect(() => {
    getDoctor();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.buttonView}>
        
      </View>
    </View>
  );
};

export default DoctorPatients;
