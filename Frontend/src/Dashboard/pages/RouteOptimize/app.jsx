import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import { Select } from "@chakra-ui/react";
import { FaSearchLocation } from "react-icons/fa";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";
import axios from "axios";
import { KJUR } from "jsrsasign";
import { useEffect } from "react";
const center = { lat: 23.8041, lng: 90.4152 };

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAds41EFa5EPmBRSFkcDB3Sh92pfpjeixI",
    libraries: ["places"],
  });
  const [stsData, setStsData] = useState([]);
  const [landfillData, setLandfillData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    let userId = null;

    console.log("Access token");

    if (token) {
      const decodedToken = KJUR.jws.JWS.parse(token);
      userId = decodedToken.payloadObj?.id;
      console.log(userId);
    }

    if (userId) {
      axios
        .get(`http://localhost:3000/sts/value/${userId}`)
        .then((response) => {
          console.log(response.data); // This will log the array of Sts documents
          if (typeof response.data === "string") {
            setStsData([
              {
                _id: "default",
                wardno: "Dhaka Center",
                gpscoords: "23.8103,90.4125",
              },
            ]);
          } else {
            setStsData(response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching Sts data:", error);
        });

      axios
        .get("http://localhost:3000/landfill")
        .then((response) => {
          console.log(response.data); // This will log the array of landfill documents
          setLandfillData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching landfill data:", error);
        });
    }
  }, []);

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  if (!isLoaded) {
    return <SkeletonText />;
  }

  // async function calculateRoute() {
  //   if (originRef.current.value === "" || destiantionRef.current.value === "") {
  //     return;
  //   }
  //   // eslint-disable-next-line no-undef
  //   const directionsService = new google.maps.DirectionsService();
  //   const results = await directionsService.route({
  //     origin: originRef.current.value,
  //     destination: destiantionRef.current.value,
  //     // eslint-disable-next-line no-undef
  //     travelMode: google.maps.TravelMode.DRIVING,
  //   });
  //   setDirectionsResponse(results);
  //   setDistance(results.routes[0].legs[0].distance.text);
  //   setDuration(results.routes[0].legs[0].duration.text);
  // }

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }

    console.log(originRef.current.value);
    console.log(destiantionRef.current.value);

    // Function to check if the input is a GPS coordinate
    const isCoordinate = (input) => {
      const coordinatePattern = /^-?\d+(.\d+)?,-?\d+(.\d+)?$/;
      return coordinatePattern.test(input);
    };

    // Function to parse the input into latitude and longitude
    const parseInput = (input) => {
      const [lat, lng] = input.split(",").map(Number);
      return { lat, lng };
    };

    // Function to search for a location using coordinates
    const searchLocation = (coordinates) => {
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line no-undef
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: coordinates }, (results, status) => {
          // eslint-disable-next-line no-undef
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              resolve(results[0].formatted_address);
            } else {
              reject(new Error("No results found"));
            }
          } else {
            reject(new Error("Geocoder failed due to: " + status));
          }
        });
      });
    };

    let origin, destination;

    if (isCoordinate(originRef.current.value)) {
      const coordinates = parseInput(originRef.current.value);
      console.log(coordinates);
      origin = await searchLocation(coordinates);
      console.log(origin);
    } else {
      origin = originRef.current.value;
    }

    if (isCoordinate(destiantionRef.current.value)) {
      const coordinates = parseInput(destiantionRef.current.value);
      destination = await searchLocation(coordinates);
    } else {
      destination = destiantionRef.current.value;
    }

    console.log(destination);

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin,
      destination,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="100%"
      w="100%"
    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        px={30}
        py={10}
        m={4}
        className="px-3 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]  backdrop-blur-md"
        shadow="lg"
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        zIndex="1"
      >
        <HStack spacing={10} justifyContent="space-between">
          <Box flexGrow={1}>
            {/* <Autocomplete>
              <Input type="text" placeholder="Origin" ref={originRef} />
            </Autocomplete> */}
            <span className="p-3 font-semibold">STS Ward No :</span>
            <Select
              m={4}
              className="p-3 bg-neutral-300"
              color="black"
              placeholder="Choose Your STS Ward No"
              size="lg"
              ref={originRef}
            >
              {/* <option value="23.815257908191324, 90.42551368050358">NSU</option>
              <option value="23.81528113133229, 90.42804797998136">IUB</option>
              <option value="option3">Option 3</option> */}
              {stsData.map((sts) => (
                <option key={sts._id} value={sts.gpscoords}>
                  {sts.wardno}
                </option>
              ))}
            </Select>
          </Box>
          <Box flexGrow={1}>
            {/* <Autocomplete>
              <Input
                type="text"
                placeholder="Destination"
                ref={destiantionRef}
              />
            </Autocomplete> */}
            <span className="p-3 font-semibold">Destination Landfill No :</span>
            <Select
              m={4}
              bg='"white"'
              borderColor="white"
              color="black"
              className="p-3 bg-neutral-300"
              placeholder="Choose Destination Landfill No"
              size="lg"
              ref={destiantionRef}
            >
              {/* <option value="23.815257908191324, 90.42551368050358">NSU</option>
              <option value="23.81528113133229, 90.42804797998136">IUB</option>
              <option value="option3">Option 3</option> */}
              {landfillData.map((landfill) => (
                <option key={landfill._id} value={landfill.gpscoords}>
                  {landfill.siteno}
                </option>
              ))}
            </Select>
          </Box>

          <ButtonGroup className="p-3 bg-cyan-500">
            <Button colorScheme="red" type="submit" onClick={calculateRoute}>
              Optimize Route
            </Button>
            <IconButton
              aria-label="center back"
              icon={<FaSearchLocation />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={8} mt={4} justifyContent="center">
          <Text m={4} className="p-3 bg-rose-300">
            Distance: {distance}{" "}
          </Text>
          <Text m={4} className="p-3 bg-lime-300">
            Duration: {duration}{" "}
          </Text>
          <IconButton
            p={14}
            className="bg-purple-300 "
            aria-label="center back"
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          />
        </HStack>
      </Box>
    </Flex>
  );
}

export default App;
