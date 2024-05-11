import { Form, Input, Select, Button, message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaLandmarkDome } from "react-icons/fa6";
import { KJUR } from 'jsrsasign';
import { Radio, DatePicker } from 'antd';
export default function Landfill() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [contractEmployees, setContractEmployees] = useState([]);

  const onFinish = async (values) => {
    let successMessage = "New log entry added successfully";
    let errorMessage = "Failed to add new log entry";

    try {

      // Concatenate start and end time into a single timespan
      const startTime = values.timespan.startTime;
      const endTime = values.timespan.endTime;
      const timespan = `${startTime} - ${endTime}`;
    } catch (error) {
      message.error(error.message || errorMessage);
    
    }

return (
  <div className="w-[22rem] bg-white p-4 rounded-sm border border-gray-200">
    <strong className="flex w-full gap-2 text-2xl text-center text-lime-700">
        <FaLandmarkDome /> New Working Log
      </strong>
    <div className="flex flex-col gap-3 mt-4">
      <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item
      label="Pick a date"
  name="date"
  rules={[{ required: true, message: "Please select a date" }]}
>
  <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
</Form.Item>

<Form.Item
        label="Employee Name"
        name="empolyeeName" 
        rules={[{ required: true, message: "Please select an employee" }]}
      >
        <Select placeholder="Select an Employee">
          {contractEmployees.map((contractEmployee) => (
            <Select.Option key={contractEmployee._id} value={contractEmployee._id}> 
              {contractEmployee.name}
            </Select.Option>
          ))}
        </Select>
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
                  required: false, 
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
  name="status"
  rules={[{ required: true, message: "Please select a status" }]}
>
  <Radio.Group>
    <Radio value={0}>Is Absent</Radio>
    <Radio value={1}>Is On Leave</Radio>
  </Radio.Group>
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
