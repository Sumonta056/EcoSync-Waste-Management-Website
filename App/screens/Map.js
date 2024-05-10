import React from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import { Image } from "react-native";
import * as Location from "expo-location";
import markerIcon from "./dustbin.png";

export default function App() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 23.8103,
    longitude: 90.4125,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [mapRegion1, setMapRegion1] = useState({
    latitude: 23.8103,
    longitude: 90.4125,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [mapRegion2, setMapRegion2] = useState({
    latitude: 23.867,
    longitude: 90.405,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [mapRegion3, setMapRegion3] = useState({
    latitude: 23.869056647073492,
    longitude: 90.36748815352176,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [mapRegion4, setMapRegion4] = useState({
    latitude: 23.74345,
    longitude: 90.391754,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerPress = (coordinate) => {
    setSelectedMarker(coordinate);
  };

  const coordinates = selectedMarker
    ? [mapRegion1, selectedMarker]
    : [mapRegion1];

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    setMapRegion1({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  useEffect(() => {
    userLocation();
  }, []);
  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion1}>
        <Marker
          coordinate={mapRegion1}
          title="Marker"
          onPress={() => handleMarkerPress(mapRegion1)}
        />
        <Marker
          coordinate={mapRegion}
          title="Marker"
          description="STS Ward : 7"
          onPress={() => handleMarkerPress(mapRegion)}
        >
          <Image source={markerIcon} style={{ height: 50, width: 50 }} />
        </Marker>
        <Marker
          coordinate={mapRegion2}
          title="Marker"
          description="STS Ward : 1"
          onPress={() => handleMarkerPress(mapRegion2)}
        >
          <Image source={markerIcon} style={{ height: 50, width: 50 }} />
        </Marker>
        <Marker
          coordinate={mapRegion3}
          title="Marker"
          description="STS Ward : 3"
          onPress={() => handleMarkerPress(mapRegion3)}
        >
          <Image source={markerIcon} style={{ height: 50, width: 50 }} />
        </Marker>
        <Marker
          coordinate={mapRegion4}
          title="Marker"
          description="STS Ward : 16"
          onPress={() => handleMarkerPress(mapRegion4)}
        >
          <Image source={markerIcon} style={{ height: 50, width: 50 }} />
        </Marker>
        <Polyline
          coordinates={coordinates}
          strokeColor="#000"
          strokeWidth={3}
        />
      </MapView>

      <Button title="Get Location" onPress={userLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
