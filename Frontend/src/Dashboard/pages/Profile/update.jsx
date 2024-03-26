import axios from "axios";
import { Form, Button, Input } from "antd";
import { KJUR } from "jsrsasign";
import { useState, useEffect } from "react";

export default function Card() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    let userId = null;
  
    if (token) {
      const decodedToken = KJUR.jws.JWS.parse(token);
      userId = decodedToken.payloadObj?.id;
      console.log(userId);
    }
  
    axios
      .post("/profile", { id: userId })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  
  const handleUpdate = (values) => {
    const token = localStorage.getItem("access_token");

    axios
      .put("/profile", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  return (
    <div className="flex-1 px-4 pt-3 pb-4 bg-white border border-gray-200 rounded-sm">
      <div className="mt-3 rounded-sm border-x">
        <div className="flex flex-col gap-3 p-6 mt-4">
          <Form
            layout="vertical"
            onFinish={handleUpdate}
            initialValues={userData}
          >
            <Form.Item label="Username" name="username">
              <Input placeholder="Update UserName" />
            </Form.Item>
            <Form.Item label="Email Address" name="email">
              <Input placeholder="Update Email Address" />
            </Form.Item>
            <Form.Item label="Phone Number" name="phone">
              <Input placeholder="Update UserName" />
            </Form.Item>
            <Form.Item label="Access Roles" name="role">
              <Input placeholder="SYSTEM ADMIN" disabled={true} />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input placeholder="Update Password" className="text-black" />
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
