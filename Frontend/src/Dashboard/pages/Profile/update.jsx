import axios from "axios";
import { Form, Button, Input, Spin, message } from "antd";
import { KJUR } from "jsrsasign";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Card() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    let userId = null;

    if (token) {
      const decodedToken = KJUR.jws.JWS.parse(token);
      userId = decodedToken.payloadObj?.id;
      console.log(userId);
    }

    axios
      .post("http://localhost:3000/profile", { id: userId })
      .then((response) => {
        console.log(response);
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  const handleUpdate = (values) => {
    let successMessage = "User Profile Updated Successfully";
    let errorMessage = "Failed to Update Profile";
    console.log("Form values:", values);
    axios
      .put("http://localhost:3000/profile", values)
      .then((response) => {
        console.log(response);
        message.success(successMessage);
        setTimeout(() => {
          window.location.reload();
        }, 700);
      })
      .catch((error) => {
        message.error(error.message || errorMessage);
        console.error("Error updating user data:", error);
      });
  };

  const handlePasswordChange = () => {
    localStorage.removeItem("access_token");
    navigate("/auth/reset-password/initiate");
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <div className="flex-1 px-4 pt-3 pb-4 bg-white border border-gray-200 rounded-sm">
      <div className="flex flex-col gap-1 p-3">
        <Form
          layout="vertical"
          onFinish={handleUpdate}
          initialValues={userData}
        >
          <Form.Item label="User ID" name="_id">
            <Input disabled={true} />
          </Form.Item>
          <Form.Item label="Name" name="name">
            <Input placeholder="Update name" />
          </Form.Item>
          <Form.Item label="Email Address" name="email">
            <Input placeholder="Update Email Address" />
          </Form.Item>
          <Form.Item label="Phone Number" name="phone">
            <Input placeholder="Update name" />
          </Form.Item>
          <Form.Item label="Access Roles" name="role">
            <Input placeholder="SYSTEM ADMIN" disabled={true} />
          </Form.Item>
          <div className="flex w-full gap-2">
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

            <Form.Item>
              <Button
                type="primary"
                htmlType="Change Password"
                block
                style={{
                  backgroundColor: "red",
                  borderColor: "red",
                  fontSize: "15px",
                  height: "40px",
                }}
                onClick={handlePasswordChange}
              >
                Change Password
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}
