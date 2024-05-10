import React from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/AntDesign";

export default class Register extends React.Component {
  state = {
    email: "",
    password: "",
    name: "",
    phone: "",
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View
        style={{
          backgroundColor: "#FFF",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../Login/image.jpg")}
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
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
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
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
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
          <Icon name="phone" color="#00716F" size={24} />
          <TextInput
            placeholder="Phone"
            keyboardType="numeric"
            onChangeText={(phone) => this.setState({ phone })}
            value={this.state.phone}
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
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            style={{ paddingHorizontal: 10 }}
          />
        </View>
        {/* <View
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
            placeholder="Confirm Password"
            secureTextEntry={true}
            style={{ paddingHorizontal: 10 }}
          />
        </View> */}

        <TouchableOpacity
          onPress={async () => {
            const response = await fetch("http://192.168.137.210:3000/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
                phone: this.state.phone,
              }),
            });

            const data = await response.json();

            if (response.ok) {
              // Handle successful registration
              navigate("Login");
            } else {
              // Handle error
              console.error(data);
            }
          }}
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
          <Text
            style={{
              color: "white",
              fontSize: 18,
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
        <Text
          onPress={() => navigate("Home")}
          style={{
            alignSelf: "center",
            color: "#00716F",
            paddingVertical: 20,
          }}
        >
          "Already have an account? Login here."
        </Text>
      </View>
    );
  }
}
