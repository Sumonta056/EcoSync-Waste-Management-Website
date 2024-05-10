import { Form, Input, Select, Button, message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaLandmarkDome } from "react-icons/fa6";

export default function Contract() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/user/landfill-manager"
        );
        setManagers(data);
      } catch (error) {
        console.error(error);
      }
    };

    

    fetchManagers();
  }, []);

  const onFinish = async (values) => {
    let successMessage = "Landfill entry added successfully";
    let errorMessage = "Failed to add landfill entry";

    try {

      
      // Create a new object with timespan concatenated
      const newData = { ...values, timespan };
  
      const { data } = await axios.post("http://localhost:3000/landfill", newData);

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
  label="Contract ID"
  name="contractID" 
  rules={[
    { 
      required: true, 
      message: "Please enter contract ID" 
    },
    {
      pattern: /^[0-9]{1,2}$/,
      message: 'Contract ID is not valid'
    }
  ]}
>
  <Input placeholder="Enter Contract ID" />
</Form.Item>

<Form.Item
  label="Registration ID"
  name="registrationID" 
  rules={[
    { 
      required: true, 
      message: "Please enter the registration ID" 
    }
  ]}
>
  <Input placeholder="Enter Registration ID" />
</Form.Item>

<Form.Item
  label="TIN of the company"
  name="companyTIN" 
  rules={[
    { 
      required: true, 
      message: "Please enter TIN of the company" 
    }
  ]}
>
  <Input placeholder="Enter TIN of the Company" />
</Form.Item>

<Form.Item
  label="Contact Number"
  name="contactNumber" 
  rules={[
    { 
      required: true, 
      message: "Please enter the contact number" 
    }
  ]}
>
  <Input placeholder="Enter TIN of the Company" />
</Form.Item>

<Form.Item
  label="Workforce size"
  name="workforceSize" 
  rules={[
    { 
      required: true, 
      message: "Please enter the workforce size" 
    }
  ]}
>
  <Input placeholder="Enter the workforce size" />
</Form.Item>

<Form.Item
  label="Payment per tonnage of waste"
  name="paymentPerTonnage" 
  rules={[
    { 
      required: true, 
      message: "Please enter the payment per tonnage of waste" 
    }
  ]}
>
  <Input placeholder="Enter the payment per tonnage of waste" />
</Form.Item>

<Form.Item
  label="Contract Duration"
  name="contractDuration" 
  rules={[
    { 
      required: true, 
      message: "Please enter the duration of contract" 
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
  <Input placeholder="Enter the area of colllection" />
</Form.Item>

<Form.Item
  label="Designated STS"
  name="designatedSTS" 
  rules={[
    { 
      required: true, 
      message: "Please enter designated STS" 
    }
  ]}
>
  <Input placeholder="Enter the designated STS" />
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
