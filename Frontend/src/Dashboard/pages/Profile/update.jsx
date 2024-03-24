import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Input } from "antd";

export default function Card() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    axios
      .get("/api/user") // Replace with your actual API endpoint
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div className="flex-1 px-4 pt-3 pb-4 bg-white border border-gray-200 rounded-sm">
      <div className="mt-3 rounded-sm border-x">
        <div className="flex flex-col gap-3 p-6 mt-4">
          <Form layout="vertical" >
            <Form.Item label="Username">
              <Input
                placeholder="Update UserName"
                defaultValue={userData.username}
              />
            </Form.Item>
            <Form.Item label="Email Address">
              <Input
                placeholder="Update Email Address"
                defaultValue={userData.email}
              />
            </Form.Item>
            <Form.Item label="Phone Number">
              <Input
                placeholder="Update UserName"
                defaultValue={userData.phone}
              />
            </Form.Item>
            <Form.Item label="Access Roles">
              <Input
                placeholder="SYSTEM ADMIN"
                defaultValue={userData.role}
                disabled={true}
              />
            </Form.Item>
            <Form.Item label="Password">
              <Input
                placeholder="Update Password"
                defaultValue={userData.password}
                className="text-black"
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
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
