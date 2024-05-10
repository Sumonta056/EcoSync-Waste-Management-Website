import React, { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://192.168.137.210:8000/login", {
        email,
        password,
      });
      const token = response.data.token;
      await AsyncStorage.setItem("authToken", token);
      navigation.navigate("Dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={{
        backgroundColor: "#FFF",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("./Login/image.jpg")}
        style={{ width: "100%", height: "30%" }}
      />
      <Text style={{ fontSize: 30, alignSelf: "center" }}>Eco-Sync</Text>
      <Text
        style={{
          marginHorizontal: 55,
          textAlign: "center",
          marginTop: 5,
          opacity: 0.4,
        }}
      >
        Waste Management System in DNCC
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 55,
          borderWidth: 2,
          marginTop: 20,
          paddingHorizontal: 10,
          borderColor: "#00716F",
          borderRadius: 4,
          paddingVertical: 10,
        }}
      >
        <Icon name="mail" color="#00716F" size={24} />
        <TextInput
          placeholder="Email"
          style={{ paddingHorizontal: 10 }}
          onChangeText={setEmail}
          value={email}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 55,
          borderWidth: 2,
          marginTop: 15,
          paddingHorizontal: 10,
          borderColor: "#00716F",
          borderRadius: 4,
          paddingVertical: 10,
        }}
      >
        <Icon name="unlock" color="#00716F" size={24} />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={{ paddingHorizontal: 10 }}
          onChangeText={setPassword}
          value={password}
        />
      </View>
      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "#00716F",
          paddingVertical: 10,
          borderRadius: 4,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 55,
          marginTop: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Login</Text>
      </TouchableOpacity>
      <Text
        onPress={() => navigation.navigate("Register")}
        style={{ alignSelf: "center", color: "#00716F", paddingVertical: 20 }}
      >
        "New to our app? Register here."
      </Text>
    </View>
  );
};

export default LoginScreen;
