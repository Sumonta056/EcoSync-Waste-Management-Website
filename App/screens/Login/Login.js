import React from "react";
import { Text, View, Image, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/AntDesign";

export default class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  render() {
    const { navigate } = this.props.navigation;
    const { email, password } = this.state;

    return (
      <View
        style={{
          backgroundColor: "#FFF",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("./image.jpg")}
          style={{ width: "100%", height: "30%" }}
        />

        <Text
          style={{
            fontSize: 30,
            alignSelf: "center",
          }}
        >
          Eco-Sync
        </Text>

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
            onChangeText={this.handleEmailChange}
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
            onChangeText={this.handlePasswordChange}
            value={password}
          />
        </View>

        <TouchableOpacity
          onPress={async () => {
            const response = await fetch(
              "http://192.168.137.210:3000/auth/login",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: email, // use the email from the state
                  password: password, // use the password from the state
                }),
              }
            );

            const data = await response.json();

            if (response.ok) {
              // Save the token in AsyncStorage
              navigate("OnboardingScreen");
            } else {
              // Handle error
              console.error(data);
            }
          }}
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
          <Text
            style={{
              color: "white",
              fontSize: 18,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
        <Text
          onPress={() => navigate("Register")}
          style={{
            alignSelf: "center",
            color: "#00716F",
            paddingVertical: 20,
          }}
        >
          "New to our app? Register here."
        </Text>
      </View>
    );
  }
}
