import { Form, Input, Select, Button, message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { KJUR } from "jsrsasign";

export default function STS() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [wardNumbers, setWardNumbers] = useState([]);
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
        const wardNumbersResponse = await axios.get("http://localhost:3000/sts");
        setWardNumbers(wardNumbersResponse.data.map((sts) => ({ id: sts._id, wardNumber: sts.wardno })));

        const stsManagerResponse = await axios.get("http://localhost:3000/user");
        setStsManager(stsManagerResponse.data.map((user) => ({ id: user._id, name: user.name })));

        const vehicleNumbersResponse = await axios.get("http://localhost:3000/vehicle");
        setVehicleNumbers(vehicleNumbersResponse.data.map((vehicle) => ({ id: vehicle._id, regNumber: vehicle.regnumber })));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const onFinish = async (values) => {
    let successMessage = "Transfer entry added successfully";
    let errorMessage = "Failed to add transfer entry";
  
    try {
      // Fetch userId from the token
      const token = localStorage.getItem("access_token");
      const decodedToken = KJUR.jws.JWS.parse(token);
      const userId = decodedToken.payloadObj?.id;
  
      // Include userId in the stsmanagername property of values object
      const updatedValues = { ...values, stsmanagername: userId };
  
      const { data } = await axios.post("http://localhost:3000/transfer", updatedValues);
      if (data.error) {
        throw new Error(data.error);
      }
      message.success(successMessage);
      setTimeout(() => {
        window.location.reload();
      }, 600);
      form.resetFields();
    } catch (error) {
      message.error(error.message || errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  return (
    <div className="w-[27rem] bg-white p-4 rounded-sm border border-gray-200">
      <strong className="w-full text-2xl text-center text-gray-700">
        STS Transfer Entry
      </strong>
      <div className="flex flex-col gap-3 mt-4">
        <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
            label="STS Manager Name"
          >
            <Input value={stsManagerName} readOnly key={stsManagerName} />
          </Form.Item>
        <Form.Item
            label="STS Ward No"
            name="wardno"
            rules={[{ required: true, message: "Please select STS Manager" }]}
          >
           <Select placeholder="Select an STS Ward No">
              {wardNumbers.map((ward) => (
                <Select.Option key={ward._id} value={ward.id}>
                  {ward.wardNumber}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Vehicle Registration Number"
            name="vehicleregno"
            rules={[{ required: true, message: "Please select vehicle number" }]}
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
            rules={[{ required: true, message: "Please enter waste volume" }, { pattern: '^[1-9][0-9]{0,5}$', message: "Please enter a valid volume" }]}
          >
            <Input placeholder="Enter Waste Volume" />
          </Form.Item>
          <Form.Item
            label="Arrival Time"
            name="arrivaltime"
            rules={[{ required: true, message: "Please select arrival time" }, { pattern: timeRegex, message: "Please enter a valid time in HH:mm format" }]}
          >
            <Input placeholder="Enter Arrival Time" />
          </Form.Item>
          <Form.Item
            label="Departure Time"
            name="departuretime"
            rules={[{ required: true, message: "Please select departure time" }, { pattern: timeRegex, message: "Please enter a valid time in HH:mm format" }]}
          >
            <Input placeholder="Enter Departure Time" />
          </Form.Item>
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
};


