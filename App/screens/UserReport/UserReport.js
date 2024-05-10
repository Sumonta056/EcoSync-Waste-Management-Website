import React from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";

export default class ReportIssue extends React.Component {
  state = {
    location: "",
    issueType: "",
    description: "",
    photo: null,
    anonymous: false,
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
          Report Waste Management Issue
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
          <Entypo name="location" color="#00716F" size={24} />
          <TextInput
            placeholder="Location"
            onChangeText={(location) => this.setState({ location })}
            value={this.state.location}
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
          <Icon name="exclamationcircleo" color="#00716F" size={24} />
          <TextInput
            placeholder="Type of Issue"
            onChangeText={(issueType) => this.setState({ issueType })}
            value={this.state.issueType}
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
          <MaterialIcons name="description" color="#00716F" size={24} />
          <TextInput
            placeholder="Description"
            onChangeText={(description) => this.setState({ description })}
            value={this.state.description}
            style={{ paddingHorizontal: 10 }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 55,
            marginTop: 15,
          }}
        >
          <Switch
            onValueChange={(anonymous) => this.setState({ anonymous })}
            value={this.state.anonymous}
          />
          <Text>Report Anonymously</Text>
        </View>

        <TouchableOpacity
          onPress={this.handleAttachPhoto}
          style={{
            marginHorizontal: 55,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            backgroundColor: "#A91D3A",
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
            Attach Photo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.handleSubmit}
          style={{
            marginHorizontal: 55,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
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
            Submit Report
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  handleAttachPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ photo: result.uri });
    }
  };
  handleSubmit = async () => {
    const response = await fetch("http://192.168.137.210:3000/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: this.state.location,
        issueType: this.state.issueType,
        description: this.state.description,
        photo: this.state.photo,
        anonymous: this.state.anonymous,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Handle successful report
      navigate("Dashboard");
    } else {
      // Handle error
      console.error(data);
    }
  };
}
