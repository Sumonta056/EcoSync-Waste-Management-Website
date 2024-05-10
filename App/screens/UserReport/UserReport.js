import React, { useState, useContext, useEffect } from "react";
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
import axios from "axios";

const ReportIssue = ({ navigation }) => {
  const [location, setLocation] = useState("");
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [anonymous, setAnonymous] = useState(false);

  useEffect(() => {
    if (photo) {
      console.log("Photo URI:", photo);
    }
  }, [photo]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://192.168.137.210:8000/report", {
        location,
        issueType,
        description,
        photo,
        userId: "user",
      });

      // Handle successful report
      navigation.navigate("Dashboard");
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }
  };

  const handleAttachPhoto = async () => {
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
    setPhoto(result.assets[0].uri);
    console.log(photo);
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
          onChangeText={(text) => setLocation(text)}
          value={location}
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
          onChangeText={(text) => setIssueType(text)}
          value={issueType}
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
          onChangeText={(text) => setDescription(text)}
          value={description}
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
          onValueChange={(value) => setAnonymous(value)}
          value={anonymous}
        />
        <Text>Report Anonymously</Text>
      </View>

      <TouchableOpacity
        onPress={handleAttachPhoto}
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
        onPress={handleSubmit}
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
};

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
export default ReportIssue;
