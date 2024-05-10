import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import AntDesign from "@expo/vector-icons/AntDesign";

class NotificationScreen extends Component {
  state = {
    notifications: [
      {
        id: 1,
        title: "DNCC",
        message: "Changes to garbage collection schedules",
      },
      {
        id: 2,
        title: "Local Waste Management",
        message: "Forthcoming local waste management events",
      },
      {
        id: 3,
        title: "Recycling Guidelines",
        message:
          "Recycling guidelines to support the third-party contractor and DNCC residents",
      },
      {
        id: 4,
        title: "Educational Materials",
        message: "New educational materials",
      },
    ],
  };

  removeNotification = (id) => {
    this.setState((prevState) => ({
      notifications: prevState.notifications.filter(
        (notification) => notification.id !== id
      ),
    }));
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.notifications.map((notification) => (
          <View key={notification.id} style={styles.notification}>
            <View style={styles.header}>
              <AntDesign name="notification" size={24} color="black" />
              <Text style={styles.title}>{notification.title}</Text>
              <TouchableOpacity
                onPress={() => this.removeNotification(notification.id)}
              >
                <AntDesign name="closesquare" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <Text style={styles.text}>{notification.message}</Text>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  notification: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: "#3C5B6F",
  },
});

export default NotificationScreen;
