import { Form, Input, Select, Button, DatePicker, message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Vehicle() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    let successMessage = "Vehicle entry added successfully";
    let errorMessage = "Failed to add vehicle entry";
    
    try {
        const { data } = await axios.post("http://localhost:3000/vehicle", values);
        if (!data.success) {
            throw new Error(data.error || errorMessage);
        }
        message.success(successMessage);
        form.resetFields();
        setTimeout(() => {
          window.location.reload();
        }, 600);
    } catch (error) {
        message.error(error.message || errorMessage);
    } finally {
      setLoading(false);
    }
};

  return (
    <div className="w-[25rem] bg-white p-4 rounded-sm border border-gray-200">
      <strong className="w-full text-2xl text-center text-gray-700">
        Add Vehicle Entry
      </strong>
      <div className="flex flex-col gap-3 mt-4">
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Vehicle Registration Number"
            name="regnumber"
            rules={[{ required: true, message: "Please enter vehicle registration number" }]}
          >
            <Input placeholder="Enter Vehicle Registration Number" />
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
            label="Vehicle Fuel Cost (Loaded)"
            name="loadedfuelcost"
            rules={[{ required: true, message: "Please enter vehicle fuel cost (loaded)" }]}
          >
            <Input placeholder="Enter Vehicle Fuel Cost (Loaded)" />
          </Form.Item>
          <Form.Item
            label="Vehicle Fuel Cost (Unloaded)"
            name="unloadedfuelcost"
            rules={[{ required: true, message: "Please enter vehicle fuel cost (unloaded)" }]}
          >
            <Input placeholder="Enter Vehicle Fuel Cost (Unloaded)" />
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
