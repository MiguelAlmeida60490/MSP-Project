import { View, Text, TouchableOpacity, ActivityIndicator, Modal, StyleSheet, Pressable} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/authContext";
import { styles } from "../styles/styles";
import { app } from "../services/firebaseConfig";

const Home = () => {
  const navigation = useNavigation();
  const { currentUser, userData } = useAuth();

  const [listDocAppos, setListDocAppos] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    if (userData.role === "doctor") {

      app.firestore().collection("appointments").onSnapshot((querySnapshot) => {
        const newAppos = [];
        querySnapshot.forEach((appo) => {
          const {date} = appo.data();
          if (appo.data().doctorEmail === userData.email)
            newAppos.push(date);
        });
        setListDocAppos(newAppos);
      });
    }
  }, []);

  const HomeContent = () => {
    if (userData.role === "client") {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("MedicalAppointment")}
          >
            <Text style={styles.buttonText}>Schedule Medical Appointment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("MedicalExam")}
          >
            <Text style={styles.buttonText}>Schedule Medical Exam</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CheckIn")}
          >
            <Text style={styles.buttonText}>Check In</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (userData.role === "doctor") {

      return (
        <View>
           <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={stylesModal.modalView}>
                <Text style={stylesModal.modalText}>Hello World!</Text>
                <Pressable
                  style={[stylesModal.button, stylesModal.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("DoctorPatients", { userData })}
          >
            <Text style={styles.buttonText}>My patients</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (userData.role === "admin") {
      return (
        <View style={styles.container}>
          <Text style={{ marginBottom: 30 }}></Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("RegisterDoctor")}
          >
            <Text style={styles.buttonText}>Register Doctor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AddPrices")}
          >
            <Text style={styles.buttonText}>Add New Price</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AddInsurances")}
          >
            <Text style={styles.buttonText}>Add New Insurance</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CreateReceipt")}
          >
            <Text style={styles.buttonText}>Create New Receipt</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {userData ? (
        <HomeContent />
      ) : (
        <ActivityIndicator color="#0000ff" size="large" />
      )}
    </View>
  );
};

const stylesModal = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Home;
