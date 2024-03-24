import { Form, Input, Select, Button, DatePicker } from "antd";
import moment from "moment";

export default function vehicle() {
  return (
    <div className="w-[27rem] bg-white p-4 rounded-sm border border-gray-200">
      <strong className="w-full text-2xl text-center text-gray-700">
        Add Vehicle Entry
      </strong>
      <div className="flex flex-col gap-3 mt-4">
        <Form layout="vertical">
          <Form.Item label="Vehicle Number">
            <Input placeholder="Enter Vehicle Number" />
          </Form.Item>
          <Form.Item label="Vehicle Type">
            <Select placeholder="Select a Vehicle type">
              <Select.Option value="Open Truck">Open Truck</Select.Option>
              <Select.Option value="Dump Truck">Dump Truck</Select.Option>
              <Select.Option value="Container">Container</Select.Option>
              <Select.Option value="Compactor">Compactor</Select.Option>
              <Select.Option value="Carrier">Carrier</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Capacity">
            <Select placeholder="Select Capacity Amouny">
              <Select.Option value="3 TON">3 TON</Select.Option>
              <Select.Option value="5 TON">5 TON</Select.Option>
              <Select.Option value="7 TON">7 TON</Select.Option>
              <Select.Option value="10 TON">10 TON</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="STS Manager">
            <Input placeholder="Enter STS Manager" />
          </Form.Item>
          <Form.Item label="Date">
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
