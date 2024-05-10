import { Form, Input, Select, Button, message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { KJUR } from "jsrsasign";
import { MdTransferWithinAStation } from "react-icons/md";
export default function STSLoadEntry() {
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

  


  const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  return (
    <div className="w-[40rem] bg-white p-4 rounded-sm border border-gray-200">
      <strong className="flex justify-center w-full gap-2 pb-2 text-2xl text-center text-stone-700">
        <MdTransferWithinAStation size={30} /> STS Load Entry
      </strong>
      <div className="flex flex-col gap-3 mt-4">
        <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="Date of Collection" name="collectionDate" rules={[{ required: true, message: "Please input the collection date!" }]}>
          <Input type="date" />
        </Form.Item>
        <Form.Item label="Time of Collection" name="collectionTime" rules={[{ required: true, message: "Please input the collection time!" }]}>
          <Input type="time" />
        </Form.Item>
        <Form.Item label="Amount of Waste Collected (in kilograms)" name="wasteAmount" rules={[{ required: true, message: "Please input the amount of waste collected!" }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Contractor ID" name="contractorId" rules={[{ required: true, message: "Please input the contractor ID!" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Type of Waste Collected" name="wasteType" rules={[{ required: true, message: "Please select the type of waste collected!" }]}>
          <Select placeholder="Select a waste type">
            <Select.Option value="domestic">Domestic</Select.Option>
            <Select.Option value="plastic">Plastic</Select.Option>
            <Select.Option value="construction">Construction</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Designated STS for Deposit" name="designatedSTS" rules={[{ required: true, message: "Please input the designated STS for deposit!" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Vehicle Used for Transportation" name="vehicle" rules={[{ required: true, message: "Please input the vehicle used for transportation!" }]}>
          <Input />
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
