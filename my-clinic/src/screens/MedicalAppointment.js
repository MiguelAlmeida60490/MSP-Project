import { View, Text, Button, TouchableOpacity, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/authContext";
import DatePicker from 'react-native-modern-datepicker';

const MedicalAppointment = () => {
  const navigation = useNavigation();
  const { currentUser, userData } = useAuth();
  const [date, setDate] = useState();
  const [open, setOpen] = useState(false);

  function handleOnPress() {
    setOpen(!open);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Schedule your appointment</Text>
      {date ? (<Text>Date Picked: {date}</Text>) : (<Text>No date selected</Text>)}
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={handleOnPress}>
          <Text>Open</Text>
        </TouchableOpacity>
        <Modal animationType="slide" transparent={true} visible={open}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DatePicker
                mode='calendar'
                selected={date}
                onDateChange={(date) => setDate(date)}
              />
              <TouchableOpacity onPress={handleOnPress}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default MedicalAppointment;
