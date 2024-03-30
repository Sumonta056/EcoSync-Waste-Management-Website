import { useState } from "react";
import axios from "axios";
import { Form, Input, Button } from "antd";
import { message } from "antd";
import { Select } from "antd";
import { useEffect } from "react";

export default function EditUserForm({ userInfo }) {
  const [role, setRole] = useState(userInfo.role);
  const { Option } = Select;
  const handleSubmit = async () => {
    try {
      const updatedUser = { ...userInfo, role };
      console.log(updatedUser.role);
      await axios.put(
        `http://localhost:3000/user/${userInfo._id}/role`,
        updatedUser
      );
      message.success("User updated successfully");
      setTimeout(() => {
        window.location.reload();
      }, 600);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/rbac/roles")
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <Form onFinish={handleSubmit} className="px-10 py-5">
      <h2 className="pb-3 text-2xl font-bold text-center text-cyan-800">
        Permission Update !!
      </h2>
      <Form.Item
        label="User Role"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Select value={role} onChange={(value) => setRole(value)}>
          {roles.map((role) => (
            <Option key={role._id} value={role.roleName}>
              {role.roleName}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ backgroundColor: "green", borderColor: "green" }}
        >
          Change User Role
        </Button>
      </Form.Item>
    </Form>
  );
}
