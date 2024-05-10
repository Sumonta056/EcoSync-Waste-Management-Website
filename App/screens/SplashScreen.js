import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Image, Animated, Text } from "react-native";
import icon from "./Login/image.jpg";

export default function SplashScreen() {
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimation]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.imageContainer, { opacity: fadeAnimation }]}
      >
        <Image style={styles.image} source={icon} />
        <Text style={styles.appName}>Eco-Sync</Text>
        <Text style={styles.appSubtitle}>Waste Management in DNCC</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
  },
  imageContainer: {
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
  },
  image: {
    width: 210,
    height: 210,
    resizeMode: "cover",
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  appSubtitle: {
    fontSize: 26,
    color: '#888',
    marginTop: 10,
  },
});