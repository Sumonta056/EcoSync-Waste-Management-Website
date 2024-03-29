import { Form, Input, Select, Button, message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { KJUR } from "jsrsasign";
import { FaTruckRampBox } from "react-icons/fa6";
export default function Landfill() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [siteNumbers, setSiteNumbers] = useState([]);
  const [wardNumbers, setWardNumbers] = useState([]);
  const [landfillManagerName, setLandfillManagerName] = useState("");
  const [landfillManager, setLandfillManager] = useState([]);
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
          setLandfillManagerName(userName);
          console.log(userName); // Log the fetched user name
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }

    const fetchData = async () => {
      try {
        const siteNumbersResponse = await axios.get(
          "http://localhost:3000/landfill"
        );
        if (Array.isArray(siteNumbersResponse.data)) {
          const managerSites = siteNumbersResponse.data.filter(
            (site) => site.managerId === userId
          );
          setSiteNumbers(
            managerSites.map((landfill) => ({
              id: landfill._id,
              siteNumber: landfill.siteno,
            }))
          );
        }

        const wardNumbersResponse = await axios.get(
          "http://localhost:3000/sts"
        );
        setWardNumbers(
          wardNumbersResponse.data.map((sts) => ({
            id: sts._id,
            wardNumber: sts.wardno,
          }))
        );

        const landfillManagerResponse = await axios.get(
          "http://localhost:3000/user"
        );
        setLandfillManager(
          landfillManagerResponse.data.map((user) => ({
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
          }))
        );
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
      const updatedValues = { ...values, landfillmanagername: userId };

      const { data } = await axios.post(
        "http://localhost:3000/dump",
        updatedValues
      );
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
    <div className="w-[40rem] bg-white p-4 rounded-sm border border-gray-200">
      <strong className="flex w-full gap-2 text-xl text-center text-cyan-800">
        <FaTruckRampBox size={26} /> Truck Dumping Entry
      </strong>
      <div className="flex flex-col gap-3 mt-4">
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item label="Landfill Manager Name">
            <Input
              value={landfillManagerName}
              readOnly
              key={landfillManagerName}
            />
          </Form.Item>
          <div className="flex gap-2">
            <Form.Item
              className="w-full block-style"
              label="Landfill Site No"
              name="siteno"
              rules={[
                { required: true, message: "Please select landfill site" },
              ]}
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
              className="w-full block-style"
              label="STS No"
              name="wardno"
              rules={[{ required: true, message: "Please select STS ward no" }]}
            >
              <Select placeholder="Select a STS Ward No">
                {wardNumbers.map((ward) => (
                  <Select.Option key={ward._id} value={ward.id}>
                    {ward.wardNumber}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <Form.Item
            label="Truck Registration Number"
            name="vehicleregno"
            rules={[{ required: true, message: "Please select truck" }]}
          >
            <Select placeholder="Select a Truck">
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
                pattern: "^[1-9][0-9]{0,5}$",
                message: "Please enter a valid volume",
              },
            ]}
          >
            <Input placeholder="Enter Waste Volume" />
          </Form.Item>
          <div className="flex gap-3">
            <Form.Item
              className="w-full block-style"
              label="Arrival Time"
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
              <Input placeholder="Enter Departure Time" />
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
