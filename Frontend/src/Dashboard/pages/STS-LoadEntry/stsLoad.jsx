import { Form, Input, Select, Button, message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdTransferWithinAStation } from "react-icons/md";
export default function STSLoadEntry() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [wardNumbers, setWardNumbers] = useState([]);
  const [stsManager, setStsManager] = useState([]);
  const [vehicleNumbers, setVehicleNumbers] = useState([]);
  const [contractors, setContractors] = useState([]);
  const [sts, setSts] = useState([]);

  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const response = await axios.get("http://localhost:3000/contractor");
        setContractors(response.data);
      } catch (error) {
        console.error('Error fetching contractors:', error);
      }
    };

    const fetchSts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/sts");
        setSts(response.data);
      } catch (error) {
        console.error('Error fetching sts:', error);
      }
    };
    

    const fetchData = async () => {
      try {

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
    fetchSts();
    fetchContractors();
  }, []);


  const onFinish = async (values) => {
    let successMessage = "Transport entry added successfully";
    let errorMessage = "Failed to add transport entry";
  
    try {
      setLoading(true);
  
      const { data } = await axios.post(
        "http://localhost:3000/transport",
        values // Use 'values' directly instead of 'updatedValues'
      );
      console.log(values); // Log the form values submitted
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
  const dateRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/;
  return (
    <div className="w-[40rem] bg-white p-4 rounded-sm border border-gray-200">
      <strong className="flex justify-center w-full gap-2 pb-2 text-2xl text-center text-stone-700">
        <MdTransferWithinAStation size={30} /> Contractor to STS Transport Entry
      </strong>
      <div className="flex flex-col gap-3 mt-4">
        <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
        label="Collection Date"
        name="collectiondate"
        rules={[
          { required: true, message: "Please enter collection date" },
          {
            pattern: dateRegex,
            message: "Please enter a valid date in dd-mm-yyyy format",
          },
        ]}
      >
        <Input placeholder="Enter Collection Date" />
      </Form.Item>
        <Form.Item
              label="Collection Time"
              className="w-full block-style"
              name="collectiontime"
              rules={[
                { required: true, message: "Please enter collection time" },
                {
                  pattern: timeRegex,
                  message: "Please enter a valid time in HH:mm format",
                },
              ]}
            >
              <Input placeholder="Enter Collection Time" />
            </Form.Item>
            <Form.Item
  label="Amount of Waste Collected (in kilograms)"
  name="wasteamount"
  rules={[
    {
      required: true,
      message: "Please input the amount of waste collected!",
    },
    {
      pattern: /^\d+(\.\d+)?$/,
      message: "Please enter a valid number.",
    },
  ]}
>
  <Input placeholder="Waste Amount" />
</Form.Item>


<Form.Item
      label="Contractor Company"
      name="contractorid"
      rules={[
        {
          required: true,
          message: "Please select the contractor company!"
        }
      ]}
    >
      <Select placeholder="Select a contractor">
              {/* Map over contractors to generate Option components */}
              {contractors.map(contractor => (
                <Option key={contractor._id} value={contractor._id}>
                  {contractor.companyName}
                </Option>
              ))}
            </Select>
    </Form.Item>
        <Form.Item label="Type of Waste" name="wastetype" rules={[{ required: true, message: "Please select the type of waste collected!" }]}>
          <Select placeholder="Select a waste type">
            <Select.Option value="domestic">Domestic</Select.Option>
            <Select.Option value="plastic">Plastic</Select.Option>
            <Select.Option value="construction">Construction</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
            label="Designated STS"
            name="wardno"
            rules={[
              { required: true, message: "Please select STS" },
            ]}
          >
            <Select placeholder="Select a contractor">
        {sts.map(sts => (
          <Option key={sts._id} value={sts.wardno}>
            {sts.wardno}
          </Option>
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
