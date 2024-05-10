import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Buttons = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.textInfo}>i</Text>
      </View>
      <Text style={styles.btnName}>{props.name}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Click Here" onPress={() => {}} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
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
  },
  buttonContainer: {
    marginLeft: 20,
  },
  circle: {
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#9DB2BF",
  },
  textInfo: {
    color: "#6a706e",
    fontWeight: "bold",
  },
  btnName: {
    fontWeight: "bold",
    color: "#FFF",
    fontSize: 17,
    marginLeft: 20,
  },
  number: {
    fontWeight: "bold",
    color: "red",
    fontSize: 14,
    marginLeft: 90,
  },
});
export default Buttons;
