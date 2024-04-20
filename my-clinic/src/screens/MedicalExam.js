import { View, Text, Button, TouchableOpacity, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/authContext";
import DatePicker from "react-native-modern-datepicker";
import { TextInput } from "react-native-gesture-handler";
import { app } from "../services/firebaseConfig";

const MedicalExam = () => {
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const [doctor, setDoctor] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState("");

  const navigation = useNavigation();
  const { currentUser, userData } = useAuth();

  return (
    <View>
      <Text>MedicalExam</Text>
    </View>
  );
};

export default MedicalExam;
