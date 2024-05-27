import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { app } from "../services/firebaseConfig";
import { useAuth } from "../contexts/authContext";
const UserReceipts = () => {
  const [receipts, setReceipts] = useState([]);
  const { currentUser, userData } = useAuth();

  useEffect(() => {
    app
      .firestore()
      .collection("receipts")
      .onSnapshot((querySnapshot) => {
        if (userData) {
          const newReceipts = [];
          querySnapshot.forEach((doc) => {
            const {
              appointment,
              appointmentDescription,
              appointmentPrice,
              exam,
              examDescription,
              examPrice,
              insurance,
              total,
              user,
            } = doc.data();
            if (doc.data().user === userData.email) {
              newReceipts.push({
                appointment,
                appointmentDescription,
                appointmentPrice,
                exam,
                examDescription,
                examPrice,
                insurance,
                total,
                user,
                id: doc.id,
              });
            }
          });
          setReceipts(newReceipts);
        }
      });
  }, []);

  console.log(receipts);

  return (
    <View style={styles.container}>
      <FlatList
        data={receipts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.appointmentDescription}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default UserReceipts;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  card: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderWidth: 1,
    marginBottom: 5,
  },
});
