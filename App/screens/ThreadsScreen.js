import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { UserType } from "../UserContext";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

const ThreadsScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (photo) {
      console.log("Photo URI:", photo);
    }
  }, [photo]);

  const handlePostSubmit = () => {
    const postData = {
      userId,
      content,
      photo,
    };

    axios
      .post("http://192.168.137.210:8000/create-post", postData)
      .then((response) => {
        console.log(response);
        alert("Post Successfull!");
        setContent("");
        setPhoto(null);
      })
      .catch((error) => {
        console.log("error creating post", error);
      });
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
    <SafeAreaView style={{ padding: 80 }}>
      <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}>
        Share your story
      </Text>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <Image
          style={{
            width: 200,
            height: 200,
            borderRadius: 100, // make it half of width and height for a perfect circle
            resizeMode: "contain",
            borderWidth: 2, // add a border
            borderColor: "gray", // set the border color
            margin: 10, // add some margin around the image
          }}
          source={photo ? { uri: photo } : null}
          onLoad={() => console.log("Image loaded!")}
          onError={(error) => console.log("Error loading image:", error)}
        />
      </View>
      <View style={{ flexDirection: "col", marginLeft: 10 }}>
        <Text style={{ fontWeight: "bold", marginBottom: 20 }}>
          Your Message:
        </Text>
        <TextInput
          value={content}
          onChangeText={(text) => setContent(text)}
          placeholderTextColor={"black"}
          placeholder="Type your message..."
          multiline
          style={{ borderColor: "gray", borderWidth: 1, padding: 20 }} // Add this line
        />
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

      <View style={{ marginTop: 20 }} />

      <Button onPress={handlePostSubmit} title="Share Post" />
    </SafeAreaView>
  );
};

export default ThreadsScreen;

const styles = StyleSheet.create({});
