import { Form, Input, Select, Button, DatePicker, message } from "antd";
import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Vehicle() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [stsManagers, setStsManagers] = useState([]);

  useEffect(() => {
    const fetchStsManagers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user");
        const users = response.data;
        const stsManagers = users.filter(user => user.role === "STS-MANAGER");
        setStsManagers(stsManagers);
      } catch (error) {
        console.error("Error fetching STS managers:", error);
      }
    };

    fetchStsManagers();
  }, []);

  const onFinish = async (values) => {
    let successMessage = "Vehicle entry added successfully";
    let errorMessage = "Failed to add vehicle entry";
    
    try {
        const { data } = await axios.post("http://localhost:3000/vehicle", values);
        if (!data.success) {
            throw new Error(data.error || errorMessage);
        }
        form.resetFields();
    } catch (error) {
        message.error(error.message || errorMessage);
    } finally {
        message.success(successMessage);
    }
};


  return (
    <div className="w-[27rem] bg-white p-4 rounded-sm border border-gray-200">
      <strong className="w-full text-2xl text-center text-gray-700">
        Add Vehicle Entry
      </strong>
      <div className="flex flex-col gap-3 mt-4">
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Vehicle Number"
            name="number"
            rules={[{ required: true, message: "Please enter vehicle number" }]}
          >
            <Input placeholder="Enter Vehicle Number" />
          </Form.Item>
          <Form.Item
            label="Vehicle Type"
            name="type"
            rules={[{ required: true, message: "Please select vehicle type" }]}
          >
            <Select placeholder="Select a Vehicle type">
              <Select.Option value="Open Truck">Open Truck</Select.Option>
              <Select.Option value="Dump Truck">Dump Truck</Select.Option>
              <Select.Option value="Container">Container</Select.Option>
              <Select.Option value="Compactor">Compactor</Select.Option>
              <Select.Option value="Carrier">Carrier</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Capacity"
            name="capacity"
            rules={[{ required: true, message: "Please select capacity amount" }]}
          >
            <Select placeholder="Select Capacity Amount">
              <Select.Option value="3 TON">3 TON</Select.Option>
              <Select.Option value="5 TON">5 TON</Select.Option>
              <Select.Option value="7 TON">7 TON</Select.Option>
              <Select.Option value="10 TON">10 TON</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
          label="STS Manager"
          name="stsManager" // Update the name to match the backend
          rules={[{ required: true, message: "Please select STS Manager" }]}
        >
          <Select placeholder="Select STS Manager">
            {stsManagers.map(manager => (
              <Select.Option key={manager._id} value={manager.name}>
                {manager.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>


          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker
              format="DD MMMM YYYY"
              defaultValue={moment()}
              style={{ width: "100%" }}
            />
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
