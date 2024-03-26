import { useState } from "react";
import axios from "axios";
import { Form, Input, Button } from "antd";
import { message } from "antd";

export default function EditUserForm({ userInfo }) {
  const [email, setEmail] = useState(userInfo.email);
  const [id, setID] = useState(userInfo._id);
  const [name, setName] = useState(userInfo.name);
  const [phone, setPhone] = useState(userInfo.phone);

  const handleSubmit = async () => {
    try {
      const updatedUser = { ...userInfo, email, id, name, phone };
      await axios.put(
        `http://localhost:3000/user/${userInfo._id}`,
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

  return (
    <Form onFinish={handleSubmit} className="px-10 py-5">
      <h2 className="pb-3 text-2xl font-bold text-center text-cyan-800">
        Update User Information !!
      </h2>
      <Form.Item
        label="User ID"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Input
          type="name"
          value={id}
          onChange={(e) => setID(e.target.value)}
          disabled
        />
      </Form.Item>
      <Form.Item
        label="User Name"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Input
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Item>
      <Form.Item
        label="Email"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Item>
      <Form.Item
        label="Phone Number"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ backgroundColor: "green", borderColor: "green" }}
        >
          Update
        </Button>
      </Form.Item>
    </Form>
  );
}
