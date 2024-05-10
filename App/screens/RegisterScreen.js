import React, { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();

  const handleRegister = async () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://192.168.137.210:8000/register",
        user
      );
      console.log(response);
      setName("");
      setEmail("");
      setPassword("");
      navigation.navigate("Login");
    } catch (error) {
      console.log("error", error);
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
        User Registration Information
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
          onChangeText={(text) => setEmail(text)}
          value={email}
          style={{ paddingHorizontal: 10 }}
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
        <Icon name="user" color="#00716F" size={24} />
        <TextInput
          placeholder="Name"
          onChangeText={(text) => setName(text)}
          value={name}
          style={{ paddingHorizontal: 10 }}
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
        <Icon name="lock" color="#00716F" size={24} />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
          style={{ paddingHorizontal: 10 }}
        />
      </View>

      <TouchableOpacity
        onPress={handleRegister}
        style={{
          marginHorizontal: 55,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
          backgroundColor: "#00716F",
          paddingVertical: 10,
          borderRadius: 4,
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Register</Text>
      </TouchableOpacity>

      <Text
        onPress={() => navigation.navigate("Login")}
        style={{ alignSelf: "center", color: "#00716F", paddingVertical: 20 }}
      >
        Already have an account? Login here.
      </Text>
    </View>
  );
};

export default RegisterScreen;
