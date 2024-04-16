import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/authContext";
import DatePicker from 'react-native-date-picker'


const MedicalAppointment = () => {
  const navigation = useNavigation();
  const { currentUser, userData } = useAuth();
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)


  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Schedule your appointment</Text>
      <View style={styles.buttonView}>
      <Button title="Open" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
      </View>
    </View>
  );
};

export default MedicalAppointment;
