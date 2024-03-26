import { Form, Input, Select, Button, message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Landfill() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/user/landfill-manager");
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
      // Concatenate start and end time into a single timespan
      const startTime = values.timespan.startTime;
      const endTime = values.timespan.endTime;
      const timespan = `${startTime} - ${endTime}`;
      
      // Create a new object with timespan concatenated
      const newData = { ...values, timespan };
  
      const { data } = await axios.post("http://localhost:3000/landfill", newData);
      if (data.error) {
        throw new Error(data.error);
      }
      message.success(successMessage);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
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
      Create Landfill
    </strong>
    <div className="flex flex-col gap-3 mt-4">
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
        label="Manager Name"
        name="managerId" 
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
            label="Operational Timespan"
            style={{ marginBottom: 10 }} 
          >
            <Form.Item
              name="timespan"
              noStyle
              rules={[
                { 
                  required: true, 
                  message: 'Please enter operational timespan' 
                }, 

              ]}
            >
              <Input.Group compact style={{ display: 'inline-block' }}>
                <Form.Item
                  name={['timespan', 'startTime']}
                  noStyle
                  rules={[
                    {
                      pattern: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
                      message: 'Please enter a valid start time in HH:mm format'
                    }
                  ]}
                  style={{ marginRight: '8px', marginBottom: '8px' }}
                >
                  <Input placeholder="Start Time" style={{ width: '42%' }} />
                </Form.Item>
                <span style={{ padding: '0 8px', marginBottom: '8px' }}>to</span>
                <Form.Item
                  name={['timespan', 'endTime']}
                  noStyle
                  rules={[
                    {
                      pattern: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
                      message: 'Please enter a valid end time in HH:mm format'
                    }
                  ]}
                  style={{ marginRight: '8px', marginBottom: '8px' }}
                >
                  <Input placeholder="End Time" style={{ width: '42%' }} />
                </Form.Item>
              </Input.Group>
            </Form.Item>
          </Form.Item>
        <Form.Item
          label="GPS Coordinates"
          name="gpscoords"
          rules={[{ required: true, message: "Please enter GPS coordinates" }]}
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
