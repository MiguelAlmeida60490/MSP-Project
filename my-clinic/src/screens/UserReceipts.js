import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { app } from "../services/firebaseConfig";

const UserReceipts = () => {
  const [receipts, setReceipts] = useState([]);
  useEffect(() => {
    app
      .firestore()
      .collection("receipts")
      .onSnapshot((querySnapshot) => {
        const newReceipts = [];
        querySnapshot.forEach((doc) => {
          const {
            appointment,
            appointmentPrice,
            exam,
            examPrice,
            insurance,
            total,
            user,
          } = doc.data();
          newReceipts.push({
            appointment,
            appointmentPrice,
            exam,
            examPrice,
            insurance,
            total,
            user,
            id: doc.id,
          });
        });
        set;
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList />
      <View style={styles.card}></View>
    </View>
  );
};

export default UserReceipts;

const styles = StyleSheet.create({
  container: {
    width: "95%",
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
  },
});
