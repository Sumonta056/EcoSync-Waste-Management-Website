import { Form, Input, Select, Button, message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

export default function STS() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/user/sts-manager"
        );
        setManagers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchManagers();
  }, []);

  const onFinish = async (values) => {
    let successMessage = "STS entry added successfully";
    let errorMessage = "Failed to add sts entry";

    try {
      const { data } = await axios.post("http://localhost:3000/sts", values);
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

  return (
    <div className="w-[27rem] bg-white p-4 rounded-sm border border-gray-200">
      <strong className="w-full text-2xl text-center text-gray-700">
        Create STS
      </strong>
      <div className="flex flex-col gap-3 mt-4">
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Ward Number"
            name="wardno"
            rules={[{ required: true, message: "Please select ward number" }]}
          >
            <Select placeholder="Select a Ward Number (1 to 54)">
              {[...Array(54)].map((_, i) => (
                <Select.Option key={i} value={i + 1}>
                  {i + 1}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Manager Name"
            name="managerId" // Change this to managerId
            rules={[{ required: true, message: "Please select manager name" }]}
          >
            <Select placeholder="Select a Manager">
              {managers.map((manager) => (
                <Select.Option key={manager._id} value={manager._id}>
                  {manager.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Capacity"
            name="capacity"
            rules={[{ required: true, message: "Please enter capacity" }]}
          >
            <Input placeholder="Enter Capacity" />
          </Form.Item>
          <Form.Item
            label="GPS Coordinates"
            name="gpscoords"
            rules={[
              { required: true, message: "Please enter GPS coordinates" },
            ]}
          >
            <Input placeholder="Enter GPS Coordinates" />
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
