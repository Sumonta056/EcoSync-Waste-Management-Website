import { Form, Input, Select, Button, message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaLandmarkDome } from "react-icons/fa6";

export default function Contractor() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [stsRoutes, setStsRoutes] = useState([]);

  useEffect(() => {
    const fetchStsRoutes = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/sts"
        );
        setStsRoutes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStsRoutes();
  }, []);

  const onFinish = async (values) => {
    let successMessage = "STS entry added successfully";
    let errorMessage = "Failed to add sts entry";

    try {
      const { data } = await axios.post("http://localhost:3000/contractor", values);
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
    <div className="w-[22rem] bg-white p-4 rounded-sm border border-gray-200">
      <strong className="flex w-full gap-2 text-2xl text-center text-lime-700">
          <FaLandmarkDome /> New Contractor Entry
        </strong>
      <div className="flex flex-col gap-3 mt-4">
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Name of the Company"
            name="companyName" 
            rules={[
              { 
                required: true, 
                message: "Please enter company name" 
              },
            ]}
          >
            <Input placeholder="Enter name of the company" />
          </Form.Item> 
  
          <Form.Item
            label="Registration Date"
            name="registrationDate" 
            rules={[
              { 
                required: true, 
                message: "Please enter the registration Date" 
              },
              {
                pattern: /^\d{2}-\d{2}-\d{4}$/, // YYYY-MM-DD format
                message: "Please enter a valid date in YYYY-MM-DD format"
              }
            ]}
          >
            <Input placeholder="Enter Registration Date" />
          </Form.Item>
  
          <Form.Item
            label="TIN of the company"
            name="companyTIN" 
            rules={[
              { 
                required: true, 
                message: "Please enter TIN of the company" 
              },
              {
                pattern: /^[0-9]{10}$/, 
                message: "Please enter a valid TIN"
              }
            ]}
          >
            <Input placeholder="Enter TIN of the Company" />
          </Form.Item>
  
          <Form.Item
            label="Contact Number"
            name="contactNo" 
            rules={[
              { 
                required: true, 
                message: "Please enter the contact number" 
              },
              {
                pattern: /^[0-9]{11}$/, // 7 to 15 digits
                message: "Please enter a valid contact number"
              }
            ]}
          >
            <Input placeholder="Enter Contact Number" />
          </Form.Item>
  
          <Form.Item
            label="Workforce size"
            name="workForceSize" 
            rules={[
              { 
                required: true, 
                message: "Please enter the workforce size" 
              },
              {
                pattern: /^\d{1,5}$/, // 1 to 5 digits
                message: "Please enter a valid workforce size"
              }
            ]}
          >
            <Input placeholder="Enter the workforce size" />
          </Form.Item>
  
          <Form.Item
            label="Payment per tonnage of waste"
            name="paymentPerTon" 
            rules={[
              { 
                required: true, 
                message: "Please enter the payment per tonnage of waste" 
              },
              {
                pattern: /^\d{1,5}$/, // 1 to 5 digits
                message: "Please enter a valid payment"
              }
            ]}
          >
            <Input placeholder="Enter the payment per tonnage of waste" />
          </Form.Item>
  
          <Form.Item
            label="Waste per day"
            name="wastePerDay" 
            rules={[
              { 
                required: true, 
                message: "Please enter the waste per day" 
              },
              {
                pattern: /^\d{1,5}$/, // 1 to 5 digits
                message: "Please enter a valid waste value"
              }
            ]}
          >
            <Input placeholder="Enter the waste per day" />
          </Form.Item>
  
          <Form.Item
            label="Contract Duration"
            name="contractDuration" 
            rules={[
              { 
                required: true, 
                message: "Please enter the duration of contract" 
              },
              {
                pattern: /^\d{1,5}$/, // 1 to 5 digits
                message: "Please enter a valid duration"
              }
            ]}
          >
            <Input placeholder="Enter the duration of contract" />
          </Form.Item>
  
          <Form.Item
            label="Area of collection"
            name="collectionArea" 
            rules={[
              { 
                required: true, 
                message: "Please enter area of collection" 
              }
            ]}
          >
            <Input placeholder="Enter the area of collection" />
          </Form.Item>
  
          <Form.Item
            label="Designated STS"
            name="wardno" 
            rules={[
              { 
                required: true, 
                message: "Please select designated STS" 
              }
            ]}
          >
            <Select placeholder="Select designated STS">
              {stsRoutes.map(route => (
                <Select.Option key={route._id} value={route.wardno}>
                  {route.wardno}
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