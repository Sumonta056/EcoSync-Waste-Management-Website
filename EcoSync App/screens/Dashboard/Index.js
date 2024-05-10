import React, { Component } from "react";
import { useEffect, useRef } from "react";

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
import unnamedImage from "./assets/image.jpg";
import avatarImage from "./assets/notification.png";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import { useNavigation } from '@react-navigation/native';


const Index = () => {
  const windowWidth = Dimensions.get("window").width;
  const translateX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  // ...

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
        <ImageBackground source={unnamedImage} style={styles.map}>
          <View style={styles.col}>
            {/* <View style={{ width: "50%" }}>
              <Icon name="" color="#FFF" size={26} />
            </View> */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Notification")}
              style={{ width: "50%" }}
            >
              <Ionicons name="notifications" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <ScrollView
          style={{ paddingTop: 5 }}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{ paddingBottom: 0 }}
        >
          <Cards
            onPress={() => this.props.navigation.navigate("Detail")}
            icon="truck-moving"
            title="Total Trucks"
            bg="#31363F"
            number="90"
          />
          <Cards icon="users" title="Total Users" bg="#424153" number="42" />
          <Cards
            icon="landmark"
            title="Total Landfills"
            bg="#3F2E3E"
            number="113"
          />
          <Cards icon="users" title="Total Users" bg="#424153" number="42" />
        </ScrollView>
        <View style={{ flex: 25 }}>
          {/* <Buttons name="Add Vehicle Entry" />
          <Buttons
            name="Add Landfill Entry"
            onPress={() => this.props.navigation.navigate("Landfill")}
          /> */}
          {/* <TouchableOpacity
            onPress={() => navigation.navigate("Users")}
            style={{
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderRadius: 15,
              borderColor: "#0E2954",
              borderWidth: 0.3,
              marginHorizontal: 30,
              paddingHorizontal: 20,
              paddingVertical: 15,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 5,
              marginBottom: 5,
              backgroundColor: "#526D82",
            }}
          >
            <Icon name="person" size={24} color="#fff" />
            <Text style={{ color: "#fff", fontSize: 20, marginLeft: 10 }}>
              User Data
            </Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => navigation.navigate("UserReport")}
            style={{
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderRadius: 15,
              borderColor: "#0E2954",
              borderWidth: 0.3,
              marginHorizontal: 30,
              paddingHorizontal: 20,
              paddingVertical: 15,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 5,
              marginBottom: 5,
              backgroundColor: "#00716F",
            }}
          >
            <Octicons name="report" size={24} color="#fff" />
            <Text style={{ color: "#fff", fontSize: 20, marginLeft: 10 }}>
              Create Report
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
