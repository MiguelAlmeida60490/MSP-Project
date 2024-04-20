import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/authContext";
import DatePicker from "react-native-modern-datepicker";
import { TextInput } from "react-native-gesture-handler";
import { app } from "../services/firebaseConfig";
import DropDownPicker from "react-native-dropdown-picker";

const MedicalAppointment = () => {
  const navigation = useNavigation();
  const { currentUser, userData } = useAuth();
  const [date, setDate] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [doctor, setDoctor] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState("");
  const [listDoctors, setListDoctors] = useState([]);
  const [openDoctors, setOpenDoctors] = useState(false);
  const [value, setValue] = useState(null);

  useEffect(() => {
    app
      .firestore()
      .collection("users")
      .onSnapshot((querySnapshot) => {
        const newDoctors = [];
        querySnapshot.forEach((doc) => {
          const { email, name, role } = doc.data();
          if (doc.data().role === "doctor") {
            newDoctors.push({ label: "Dr. " + name, value: email });
          }
        });
        setListDoctors(newDoctors);
      });
  }, []);

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
      checkIn: false,
      clientEmail: userData.email,
      date,
      value,
      desc,
    });
  };

  function handleOnPress() {
    setOpenDate(!openDate);
  }

  console.log(listDoctors);

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Schedule your appointment</Text>
      {date ? <Text>Date Picked: {date}</Text> : <Text>No date selected</Text>}
      <View>
        <TouchableOpacity style={styles.dateButton} onPress={handleOnPress}>
          <Text style={styles.centerText}>
            {date ? "Change Date" : "Choose Date"}
          </Text>
        </TouchableOpacity>
        <Modal animationType="slide" transparent={true} visible={openDate}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DatePicker onSelectedChange={(date) => setDate(date)} />
              <TouchableOpacity onPress={handleOnPress}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <DropDownPicker
        open={openDoctors}
        value={value}
        items={listDoctors}
        setOpen={setOpenDoctors}
        setValue={setValue}
        setItems={setListDoctors}
        style={styles.dropdown}
        placeholder="Select your preferred doctor"
        textStyle={{ fontSize: 18, fontWeight: "bold" }}
      />
      <TextInput
        style={styles.textBox}
        placeholder="Description"
        value={desc}
        onChangeText={(desc) => setDesc(desc)}
        multiline={true}
        textAlignVertical="top"
      ></TextInput>
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
