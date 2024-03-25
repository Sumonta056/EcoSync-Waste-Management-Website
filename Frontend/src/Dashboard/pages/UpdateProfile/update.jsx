import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Form, Button, Input } from "antd";
import Select from "antd/es/select";

const { Option } = Select;

export default function Card() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
  });

  const { userId } = useParams();

  useEffect(() => {
    console.log("userId:", userId);
    if (userId) {
      axios
        .get(`http://localhost:3000/user/${userId}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      axios
        .get(`http://localhost:3000/user`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Name:", name, "Value:", value);
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    axios
      .put(`http://localhost:3000/user/${userId}`, userData)
      .then((response) => {
        console.log("User profile updated successfully");
      })
      .catch((error) => {
        console.error("Error updating user profile:", error);
      });
  };
  

  return (
    <div className="flex-1 px-4 pt-3 pb-4 bg-white border border-gray-200 rounded-sm">
      <div className="mt-3 rounded-sm border-x">
        <div className="flex flex-col gap-3 p-6 mt-4">
          <Form layout="vertical" onSubmit={handleSubmit}>
            <Form.Item label="Username">
              <Input
                name="name"
                placeholder="Update UserName"
                value={userData.name}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item label="Email Address">
              <Input
                name="email"
                placeholder="Update Email Address"
                value={userData.email}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item label="Phone Number">
              <Input
                name="phone"
                placeholder="Update Phone Number"
                value={userData.phone}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item label="Access Roles">
              <Select
                name="role"
                placeholder="Select a role"
                value={userData.role}
                onChange={(value) => setUserData({ ...userData, role: value })}
              >
                <Option value="System Admin">System Admin</Option>
                <Option value="STS Manager">STS Manager</Option>
                <Option value="Landfill Manager">Landfill Manager</Option>
                <Option value="Unassigned">Unassigned</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Password">
              <Input
                name="password"
                placeholder="Update Password"
                value={userData.password}
                onChange={handleInputChange}
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
