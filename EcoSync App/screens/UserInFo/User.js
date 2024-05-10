import React, { useState, useEffect } from "react";
import axios from "axios";
import { ScrollView, View, Text, Button, StyleSheet } from "react-native";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://192.168.1.107:3000/user");
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {users.map((user) => (
        <View key={user._id} style={styles.userCard}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{user.name}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email}</Text>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.value}>{user.phone}</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Role:</Text>
              <Text style={styles.value}>{user.role}</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Edit" onPress={() => {}} color="#34D399" />
            <Button title="Delete" onPress={() => {}} color="#F87171" />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 50,
    paddingTop: 20,
    paddingRight: 50,
  },
  userCard: {
    marginBottom: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    padding: 16,
  },
  label: {
    marginBottom: 2,
    fontSize: 17,
    color: "#333",
    fontWeight: "bold",
  },
  value: {
    marginBottom: 10,
    fontSize: 16,
    color: "#666",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flexDirection: "column",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
