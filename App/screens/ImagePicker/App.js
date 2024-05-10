import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

const UploadImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const pickImageAsync = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          quality: 1,
        });
        if (!result.canceled) {
          setSelectedImage(result.assets[0].uri);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {selectedImage && (
        <Image
          source={{ uri: selectedImage.uri }}
          style={uploadPhotoStyles.image}
        />
      )}
      <TouchableOpacity
        style={uploadPhotoStyles.container}
        onPress={pickImageAsync}
      >
        <Text>+</Text>
      </TouchableOpacity>
    </>
  );
};
