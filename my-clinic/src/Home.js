import { View, Text, Button, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";
import { FlashList } from "@shopify/flash-list";

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    firebase
      .firestore()
      .collection("doctors")
      .onSnapshot((querySnapshot) => {
        const newDoctors = [];
        querySnapshot.forEach((doc) => {
          const { name, ccNumber } = doc.data();
          newDoctors.push({ name, ccNumber, id: doc.id });
        });
        setDoctors(newDoctors);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlashList 
        data={doctors}
        numColumns={2}
        estimatedItemSize={100}
        renderItem={({item}) => (
          <View>
            <Text>
              {item.name}
            </Text>
            <Text>
              {item.ccNumber}
            </Text>
          </View>
        )}
      >
      </FlashList>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"fff"
  }
})
