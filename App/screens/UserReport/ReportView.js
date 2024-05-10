import React, { Component } from "react";
import { useEffect, useRef } from "react";
import { useState } from "react";

import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Animated, Dimensions } from "react-native";
import Cards from "../../component/Cards";
import Buttons from "../../component/Button";
import unnamedImage from "../Dashboard/assets/image.jpg";
import avatarImage from "../Dashboard/assets/notification.png";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";

const Index = () => {
  const windowWidth = Dimensions.get("window").width;
  const translateX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch("http://192.168.137.210:8000/reports")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setReports(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: windowWidth,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ImageBackground
          source={unnamedImage}
          style={styles.map}
        ></ImageBackground>
        <Text style={styles.reportedIssue}>Reported Issue</Text>
        <ScrollView style={styles.container1}>
          {reports.map((report) => (
            <View style={styles.card1} key={report._id}>
              <Text style={styles.label1}>User Location:</Text>
              <Text style={styles.title1}>{report.location}</Text>

              <Text style={styles.label1}>Issue Type:</Text>
              <Text style={styles.title1}>{report.issueType}</Text>

              <Text style={styles.label1}>Description:</Text>
              <Text style={styles.description1}>{report.description}</Text>
              <Image style={styles.image1} source={{ uri: report.photo }} />
            </View>
          ))}
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    padding: 10,
  },
  reportedIssue: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  card1: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  label1: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  title1: {
    fontSize: 20,
    marginBottom: 10,
  },
  description1: {
    fontSize: 16,
    marginBottom: 10,
  },
  image1: {
    width: "100%",
    height: 200,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  cardContainer: {
    height: 150,
    width: 320,
    alignSelf: "center",
    backgroundColor: "#6A706E",
    borderRadius: 30,
  },
  card: {
    height: 150,
    width: 260,
    paddingTop: 20,
    paddingHorizontal: 30,
    backgroundColor: "#2b3240",
    borderRadius: 30,
    flexDirection: "row",
  },
  title: {
    color: "#6A706E",
    width: 100,
    fontSize: 12,
    fontWeight: "bold",
  },
  number: {
    color: "#FFF",
    width: 100,
    fontSize: 22,
    fontWeight: "bold",
    marginTop: -10,
  },
  textCovid: {
    transform: [{ rotate: "-90deg" }],
    color: "#3a4b4f",
    fontSize: 14,
    width: 90,
    marginLeft: -35,
    fontWeight: "bold",
    marginTop: 20,
  },
  map: {
    height: 200,
    paddingTop: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  col: {
    flexDirection: "row",
  },
  avatarContainer: {
    width: "50%",
    alignItems: "flex-end",
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  textDash: {
    color: "#000",
    fontSize: 22,
    alignSelf: "center",
    marginTop: 15,
    fontWeight: "bold",
  },
  textDash2: {
    color: "#ADACA7",
    fontSize: 15,
    alignSelf: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
  colContainer: {
    flexDirection: "row",

    marginTop: 20,
  },
  textGlobal: {
    fontWeight: "bold",
    fontSize: 16,
    color: "red",
    paddingHorizontal: 10,
  },
  textRussia: {
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 10,
    color: "#6a706e",
  },
  textRussia2: {
    fontWeight: "bold",
    color: "#322C2B",
    textAlign: "center",
    paddingBottom: 10,
    fontSize: 24,
  },
});
