import { Form, Input, Select, Button, message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdAddHome } from "react-icons/md";

export default function Employee() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/employee"
        );
        setManagers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchManagers();
  }, []);

  const onFinish = async (values) => {
    let successMessage = "Employee entry added successfully";
    let errorMessage = "Failed to add employee entry";

    try {
      const { data } = await axios.post("http://localhost:3000/employee", values);
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
    <div className="w-[23rem] bg-white p-4 rounded-sm border border-gray-200">
      <strong className="flex w-full gap-2 text-2xl text-center text-neutral-700">
        <MdAddHome size={30}/> Create New Employee
      </strong>
      <div className="flex flex-col gap-3 mt-4">
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please enter the full name" }]}
          >
            <Input placeholder="Enter Employee's Full Name" />
          </Form.Item>
          <Form.Item
            label="Date of Birth"
            name="dateOfBirth"
            rules={[
              { required: true, pattern: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/, message: "Please enter a valid date of birth in dd-mm-yyyy format" },
            ]}
          >
            <Input placeholder="Enter Employee's Date of Birth" />
          </Form.Item>
          <Form.Item
            label="Date of Hire"
            name="dateOfHire"
            rules={[
              { required: true, pattern: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/, message: "Please enter a valid date of hire in dd-mm-yyyy format" },
            ]}
          >
            <Input placeholder="Enter Employee's Date of Hire" />
          </Form.Item>

          <Form.Item
            label="Job Title"
            name="jobTitle"
            rules={[{ required: true, message: "Please enter job title" }]}
          >
            <Input placeholder="Enter Employee's Job Title" />
          </Form.Item>

          <Form.Item
          label="Payment Per Hour"
          name="paymentPerHour"
          rules={[
            { 
              required: true, 
              pattern: /^(?:\d+|\d*\.\d+)$/, 
              message: "Please enter a valid payment amount per hour (integer or float)" 
            }
          ]}
        >
          <Input placeholder="Enter Payment Per Hour" />
        </Form.Item>

        <Form.Item
          label="Contact Number"
          name="contactNo"
          rules={[
            { 
              required: true, 
              pattern: /^\d{11}$/, 
              message: "Please enter a valid 11-digit contact number" 
            }
          ]}
        >
          <Input placeholder="Enter Contact Number" />
        </Form.Item>
        <Form.Item
        label="Collection Route"
        name="collectRoute"
        rules={[
          { 
            required: true, 
            message: "Please enter the collection route" 
          }
        ]}
      >
        <Input placeholder="Enter the Assigned Collection Route" />
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
