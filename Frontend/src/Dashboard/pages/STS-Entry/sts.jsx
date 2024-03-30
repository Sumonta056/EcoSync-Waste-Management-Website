import { Form, Input, Select, Button, message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { KJUR } from "jsrsasign";
import { MdTransferWithinAStation } from "react-icons/md";
export default function STS() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [wardNumbers, setWardNumbers] = useState([]);
  const [siteNumbers, setSiteNumbers] = useState([]);
  const [stsManagerName, setStsManagerName] = useState("");
  const [stsManager, setStsManager] = useState([]);
  const [vehicleNumbers, setVehicleNumbers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    let userId = null;

    if (token) {
      const decodedToken = KJUR.jws.JWS.parse(token);
      userId = decodedToken.payloadObj?.id;

      axios
        .get(`http://localhost:3000/user/${userId}`)
        .then((response) => {
          const userName = response.data.name;
          setStsManagerName(userName);
          console.log(userName); // Log the fetched user name
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }

    const fetchData = async () => {
      try {
        const wardNumbersResponse = await axios.get(
          "http://localhost:3000/sts"
        );
        setWardNumbers(
          wardNumbersResponse.data.map((sts) => ({
            id: sts._id,
            wardNumber: sts.wardno,
            stsGpsCoords: sts.gpscoords,
          }))
        );

        const siteNumbersResponse = await axios.get(
          "http://localhost:3000/landfill"
        );
        setSiteNumbers(
          siteNumbersResponse.data.map((landfill) => ({
            id: landfill._id,
            siteNumber: landfill.siteno,
            landfillGpsCoords: landfill.gpscoords,
          }))
        );
        const stsManagerResponse = await axios.get(
          "http://localhost:3000/user"
        );
        setStsManager(
          stsManagerResponse.data.map((user) => ({
            id: user._id,
            name: user.name,
          }))
        );

        const vehicleNumbersResponse = await axios.get(
          "http://localhost:3000/vehicle"
        );
        setVehicleNumbers(
          vehicleNumbersResponse.data.map((vehicle) => ({
            id: vehicle._id,
            regNumber: vehicle.regnumber,
            capacity: vehicle.capacity,
            loadedfuelcost: vehicle.loadedfuelcost,
            unloadedfuelcost: vehicle.unloadedfuelcost,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    if (userId) {
      axios
        .get(`http://localhost:3000/sts`)
        .then((response) => {
          console.log(response);
          if (Array.isArray(response.data)) {
            const managerWards = response.data.filter(
              (ward) => ward.managerId === userId
            );
            setWardNumbers(managerWards);
            console.log(managerWards);
          }
        })
        .catch((error) => {
          console.error("Error fetching ward numbers:", error);
        });
    }
  }, []);
  console.log(wardNumbers);
  const calculateFuelAllocationCostPerKm = (
    cUnloaded,
    cLoaded,
    capacity,
    wasteVolume
  ) => {
    try {
      // Convert capacity to a number by removing the "TON" suffix
      const numericCapacity = parseFloat(capacity.replace(" TON", ""));
      const numericCUnloaded = parseFloat(cUnloaded);
      const numericCLoaded = parseFloat(cLoaded);
      const numericWasteVolume = parseFloat(wasteVolume);

      // Calculate the fuel allocation cost per kilometer using the provided formula
      let perKmCost =
        numericCUnloaded +
        (numericWasteVolume / numericCapacity) *
          (numericCLoaded - numericCUnloaded);

      console.log("Per Km Cost:", perKmCost);

      return perKmCost;
    } catch (error) {
      console.error(
        "Error calculating fuel allocation cost per kilometer:",
        error.message
      );
      return null;
    }
  };

  const onFinish = async (values) => {
    let successMessage = "Transfer entry added successfully";
    let errorMessage = "Failed to add transfer entry";

    try {
      setLoading(true);

      const token = localStorage.getItem("access_token");
      const decodedToken = KJUR.jws.JWS.parse(token);
      const userId = decodedToken.payloadObj?.id;

      const updatedValues = { ...values, stsmanagername: userId };

      // Fetch the selected vehicle's information based on the selected vehicle ID
      const selectedVehicle = vehicleNumbers.find(
        (vehicle) => vehicle.id === values.vehicleregno
      );

      // Calculate the fuel allocation cost per kilometer
      const fuelAllocationCostPerKm = calculateFuelAllocationCostPerKm(
        selectedVehicle.unloadedfuelcost,
        selectedVehicle.loadedfuelcost,
        selectedVehicle.capacity,
        parseFloat(values.wastevolume) // Convert the waste volume to a floating-point number
      );

      console.log("Fuel Allocation Cost Per Km:", fuelAllocationCostPerKm);

      
      
      console.log(wardNumbers);
      // Calculate distance between STS and landfill
      const stsgpscoords = wardNumbers.find((sts) => sts._id == values.wardno);
      console.log("STS GPS Coordinates:", stsgpscoords.gpscoords);
      const landfillgpscoords = siteNumbers.find(
        (landfill) => landfill.id == values.siteno
      );
      console.log("Landfill GPS Coordinates:", landfillgpscoords.landfillGpsCoords);

      const distance = calculateDistance(
        stsgpscoords.gpscoords,
        landfillgpscoords.landfillGpsCoords
      );
      //console.log("Distance:", distance);

      // Add perKmCost and distance to updatedValues
      updatedValues.perkmcost = fuelAllocationCostPerKm;
      updatedValues.distance = distance;

      const { data } = await axios.post(
        "http://localhost:3000/transfer",
        updatedValues
      );
      console.log(updatedValues);
      if (data.error) {
        throw new Error(data.error);
      }
      message.success(successMessage);
      form.resetFields();
    } catch (error) {
      message.error(error.message || errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const calculateDistance = (stsCoords, landfillCoords) => {
    try {
      const [stsLat, stsLng] = stsCoords.split(",").map(parseFloat);
      const [landfillLat, landfillLng] = landfillCoords
        .split(",")
        .map(parseFloat);

      if (
        isNaN(stsLat) ||
        isNaN(stsLng) ||
        isNaN(landfillLat) ||
        isNaN(landfillLng)
      ) {
        throw new Error("Invalid coordinates provided");
      }

      const R = 6371; // Radius of the Earth in kilometers
      const dLat = deg2rad(landfillLat - stsLat);
      const dLng = deg2rad(landfillLng - stsLng);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(stsLat)) *
          Math.cos(deg2rad(landfillLat)) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let distance = R * c;

      if (isNaN(distance)) {
        throw new Error("Distance calculation resulted in NaN");
      }
      distance = Number(distance);
      // Convert distance to a string with two decimal points
      const formattedDistance = distance.toFixed(2);

      return formattedDistance;
    } catch (error) {
      console.error("Error calculating distance:", error.message);
      return null;
    }
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  return (
    <div className="w-[40rem] bg-white p-4 rounded-sm border border-gray-200">
      <strong className="flex justify-center w-full gap-2 pb-2 text-2xl text-center text-stone-700">
        <MdTransferWithinAStation size={30} /> STS Transfer Entry
      </strong>
      <div className="flex flex-col gap-3 mt-4">
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item label="STS Manager Name">
            <Input value={stsManagerName} readOnly key={stsManagerName} />
          </Form.Item>
          <Form.Item
            label="STS Ward No"
            name="wardno"
            rules={[{ required: true, message: "Please select STS Manager" }]}
          >
            <Select placeholder="Select a ward number">
              {wardNumbers.map((ward) => (
                <Select.Option key={ward._id} value={ward.id}>
                  {ward.wardno}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Landfill Site No"
            name="siteno"
            rules={[{ required: true, message: "Please select Landfill" }]}
          >
            <Select placeholder="Select a Landfill Site No">
              {siteNumbers.map((site) => (
                <Select.Option key={site._id} value={site.id}>
                  {site.siteNumber}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Vehicle Registration Number"
            name="vehicleregno"
            rules={[
              { required: true, message: "Please select vehicle number" },
            ]}
          >
            <Select placeholder="Select a Vehicle Number">
              {vehicleNumbers.map((vehicle) => (
                <Select.Option key={vehicle._id} value={vehicle.id}>
                  {vehicle.regNumber}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Waste Volume (Tonnes)"
            name="wastevolume"
            rules={[
              { required: true, message: "Please enter waste volume" },
              {
                pattern: /^(?!0(\.0+)?$)\d*(\.\d+)?$/,
                message: "Please enter a valid volume greater than zero",
              },                           
            ]}
          >
            <Input placeholder="Enter Waste Volume" />
          </Form.Item>
          <div className="flex gap-3">
            <Form.Item
              label="Arrival Time"
              className="w-full block-style"
              name="arrivaltime"
              rules={[
                { required: true, message: "Please select arrival time" },
                {
                  pattern: timeRegex,
                  message: "Please enter a valid time in HH:mm format",
                },
              ]}
            >
              <Input placeholder="Enter Arrival Time" />
            </Form.Item>
            <Form.Item
              className="w-full block-style"
              label="Departure Time"
              name="departuretime"
              rules={[
                { required: true, message: "Please select departure time" },
                {
                  pattern: timeRegex,
                  message: "Please enter a valid time in HH:mm format",
                },
              ]}
            >
              <Input
                placeholder="Enter Departure Time"
                className="w-full block-style"
              />
            </Form.Item>
          </div>
          <Form.Item
            label="Today's Date"
            name="currentdate"
            initialValue={moment().format("YYYY-MM-DD")}
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              style={{
                backgroundColor: "green",
                borderColor: "green",
                fontSize: "15px",
                height: "40px",
              }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
