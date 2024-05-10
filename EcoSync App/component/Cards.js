import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default class Cards extends Component {
  render() {
    return (
      <View
        style={{
          ...styles.container,
          backgroundColor: this.props.bg,
        }}
      >
        <View style={styles.col}>
          {this.props.icon === "truck-moving" ? (
            <FontAwesome5 name="truck-moving" size={30} color="#FFF" />
          ) : this.props.icon === "users" ? (
            <FontAwesome name="users" size={30} color="#FFF" />
          ) : this.props.icon === "landmark" ? (
            <FontAwesome6 name="landmark" size={30} color="#FFF" />
          ) : null}
        </View>
        <Text style={styles.title}>{this.props.title}</Text>
        <Text
          style={{
            ...styles.number,
            color: this.props.bg == "red" ? "#FFF" : "#FFF",
          }}
        >
          {this.props.number}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 130,
    width: 120,
    borderRadius: 30,
    padding: 15,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  col: {
    flexDirection: "row",
  },
  title: {
    marginTop: 15,
    color: "#ADACA7",
    fontWeight: "bold",
    fontSize: 18,
  },
  number: {
    marginTop: 2,
    fontWeight: "bold",
    fontSize: 24,
    color: "#F5F7B2",
  },
});
