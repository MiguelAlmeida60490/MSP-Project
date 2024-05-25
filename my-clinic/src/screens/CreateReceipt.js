import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { app } from "../services/firebaseConfig";

const CreateReceipt = () => {
  const [listUsers, setListUsers] = useState([]);
  const [openListUsers, setOpenListUsers] = useState(false);
  const [listUserValue, setListUserValue] = useState(null);

  const [listAppointments, setListAppointments] = useState([]);
  const [openListAppointments, setOpenListAppointments] = useState(false);
  const [listAppointmentValue, setListAppointmentValue] = useState(null);

  const [listExams, setListExams] = useState([]);
  const [openListExams, setOpenListExams] = useState(false);
  const [listExamsValue, setListExamsValue] = useState(null);

  const [appointmentPrice, setAppointmentPrice] = useState(null);
  const [examPrice, setExamPrice] = useState(null);

  useEffect(() => {
    app
      .firestore()
      .collection("users")
      .onSnapshot((querySnapshot) => {
        const newUsers = [];
        newUsers.push({ label: "Select user", value: null });
        querySnapshot.forEach((doc) => {
          const { email, name, role } = doc.data();
          if (doc.data().role === "client") {
            newUsers.push({ label: name, value: email });
          }
        });
        setListUsers(newUsers);
      });
  }, []);

  useEffect(() => {
    if (listUsers) {
      app
        .firestore()
        .collection("appointments")
        .onSnapshot((querySnapshot) => {
          const newAppointments = [];
          newAppointments.push({ label: "Select appointment", value: null });
          querySnapshot.forEach((doc) => {
            const { type, clientEmail, doctorEmail, date, isPaid } = doc.data();
            if (doc.data().clientEmail === listUserValue) {
              newAppointments.push({
                label: type,
                value: doc.id,
                clientEmail,
                doctorEmail,
                date,
                isPaid,
              });
            }
          });
          setListAppointments(newAppointments);
        });
    }
  }, [listUserValue]);

  useEffect(() => {
    if (listUsers) {
      app
        .firestore()
        .collection("examEquipment")
        .onSnapshot((querySnapshot) => {
          const newExams = [];
          newExams.push({ label: "Select exam", value: null });
          querySnapshot.forEach((doc) => {
            const { equipment, client, doctor, date, isPaid } = doc.data();
            if (doc.data().client === listUserValue) {
              newExams.push({
                label: equipment,
                value: doc.id,
                client,
                doctor,
                date,
                isPaid,
              });
            }
          });
          setListExams(newExams);
        });
    }
  }, [listUserValue]);

  useEffect(() => {
    if (listAppointmentValue) {
      app
        .firestore()
        .collection("prices")
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const { type, price } = doc.data();
            if (
              doc.data().type ===
              listAppointments.find(
                (item) => item.value === listAppointmentValue
              ).label
            ) {
              setAppointmentPrice(price);
            }
          });
        });
    } else {
      setAppointmentPrice(null);
    }
  }, [listAppointmentValue]);

  useEffect(() => {
    if (listExamsValue) {
      app
        .firestore()
        .collection("prices")
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const { type, price } = doc.data();
            if (
              doc.data().type ===
              listExams.find((item) => item.value === listExamsValue).label
            ) {
              setExamPrice(price);
            }
          });
        });
    } else {
      setExamPrice(null);
    }
  }, [listExamsValue]);

  const handleCreateReceipt = () => {
    if (appointmentPrice) {
      if (examPrice) {
        if (
          !listAppointments.find((item) => item.value === listAppointmentValue)
            .isPaid &&
          !listExams.find((item) => item.value === listExamsValue).isPaid
        ) {
          alert("Appointment or medical exam were not paid yet");
        } else {
          app
            .firestore()
            .collection("receipts")
            .add({
              appointment: listAppointmentValue,
              appointmentPrice,
              exam: listExamsValue,
              examPrice,
              user: listUserValue,
              insurance: null,
              total: appointmentPrice + examPrice,
            });
        }
      } else {
        app.firestore().collection("receipts").add({
          appointment: listAppointmentValue,
          appointmentPrice,
          user: listUserValue,
          insurance: null,
          total: appointmentPrice,
        });
      }
    } else if (examPrice) {
      app.firestore().collection("receipts").add({
        exam: listExamsValue,
        examPrice,
        user: listUserValue,
        insurance: null,
        total: examPrice,
      });
    } else {
      alert("Please select an appointment or a medical exam");
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.dropDownView, { zIndex: 3 }]}>
        <Text style={styles.title}>User</Text>
        <DropDownPicker
          open={openListUsers}
          value={listUserValue}
          items={listUsers}
          setOpen={setOpenListUsers}
          setValue={setListUserValue}
          setItems={setListUsers}
          placeholder="Select user"
          textStyle={{ fontSize: 18, fontWeight: "bold" }}
          style={styles.dropDown}
        />
      </View>
      {listUserValue ? (
        <>
          <View style={[styles.dropDownView, { zIndex: 2 }]}>
            <Text style={styles.title}>Appointment</Text>
            <DropDownPicker
              open={openListAppointments}
              value={listAppointmentValue}
              items={listAppointments}
              setOpen={setOpenListAppointments}
              setValue={setListAppointmentValue}
              setItems={setListAppointments}
              placeholder="Select appointment"
              textStyle={{ fontSize: 18, fontWeight: "bold" }}
              style={styles.dropDown}
            />
          </View>
          <View style={[styles.dropDownView, { zIndex: 1 }]}>
            <Text style={styles.title}>Medical Exam</Text>
            <DropDownPicker
              open={openListExams}
              value={listExamsValue}
              items={listExams}
              setOpen={setOpenListExams}
              setValue={setListExamsValue}
              setItems={setListExams}
              placeholder="Select exam"
              textStyle={{ fontSize: 18, fontWeight: "bold" }}
              style={styles.dropDown}
            />
          </View>
          {appointmentPrice ? (
            <Text style={styles.priceText}>
              Appointment Price: {appointmentPrice}€
            </Text>
          ) : (
            <Text style={styles.priceText}>No Price for Appointment</Text>
          )}
          {examPrice ? (
            <Text style={styles.priceText}>Exam Price: {examPrice}€</Text>
          ) : (
            <Text style={styles.priceText}>No Price for Exam</Text>
          )}
          <TouchableOpacity
            style={[styles.button, { zIndex: 0 }]}
            onPress={handleCreateReceipt}
          >
            <Text style={styles.buttonText}>Create Receipt</Text>
          </TouchableOpacity>
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

export default CreateReceipt;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  dropDownView: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    width: "95%",
    marginTop: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    width: "100%",
  },
  dropdown: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    height: 50,
    width: "97%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0)",
  },
  button: {
    backgroundColor: "purple",
    padding: 15,
    borderRadius: 10,
    margin: 20,
    alignItems: "center",
    width: 250,
  },
  buttonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  priceText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});
