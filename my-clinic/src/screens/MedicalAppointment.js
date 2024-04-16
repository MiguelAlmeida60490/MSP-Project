import { View, Text, Button, TouchableOpacity, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/authContext";
import DatePicker from 'react-native-modern-datepicker';
import { TextInput } from "react-native-gesture-handler";
import { app } from "../services/firebaseConfig";


const MedicalAppointment = () => {
  const navigation = useNavigation();
  const { currentUser, userData } = useAuth();
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);
  const [doctor, setDoctor] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState("");


  const confirmAppointment = async () => {
    setLoading(true);
    try {
      handleAddAppo();
      setLoading(false);
      navigation.navigate("Home");
    } catch (error) {
      setLoading(false);
      alert("Register error: " + error.message);
      }
  };

  const handleAddAppo = () => {
    app.firestore().collection("appointments").add({
      checkIn:false,
      clientEmail: userData.email,
      date,
      doctor,
      desc
    });
  };

  function handleOnPress() {
    setOpen(!open);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Schedule your appointment</Text>
      {date ? (<Text>Date Picked: {date}</Text>) : (<Text>No date selected</Text>)}
      <View>
        <TouchableOpacity onPress={handleOnPress}>
          <Text style={styles.centerText}>Choose Date</Text>
        </TouchableOpacity>
        <Modal animationType="slide" transparent={true} visible={open}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DatePicker
                onSelectedChange={date => setDate(date)}
              />
              <TouchableOpacity onPress={handleOnPress}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TextInput
        style={styles.input}
        placeholder="Doctor preference"
        value={doctor}
        onChangeText={(doctor) => setDoctor(doctor)}
      ></TextInput>
       <TextInput
        style={styles.input}
        placeholder="Description"
        value={desc}
        onChangeText={(desc) => setDesc(desc)}
      ></TextInput>
      </View>
      <TouchableOpacity
          style={styles.button}
          onPress={() => {
            confirmAppointment();
        }}
        >
          <Text style={styles.buttonText}>Confirm appointment</Text>
        </TouchableOpacity>
    </View>
    
  );
};

export default MedicalAppointment;
