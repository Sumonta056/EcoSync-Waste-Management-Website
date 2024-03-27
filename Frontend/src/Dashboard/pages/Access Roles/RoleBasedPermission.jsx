import { Form, Input, Select, Button, message, Modal } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoAccessibility } from "react-icons/io5";

export default function RoleBasedPermission() {
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values1 = await form1.validateFields();
      console.log("Form values:", values1);
      const response = await axios.post(
        "http://localhost:3000/rbac/roles",
        values1
      );
      console.log("Response status:", response.status);

      if (response.status === 200) {
        message.success("Role created successfully");
        setIsModalVisible(false);
        form1.resetFields();
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        message.error("Failed to create role");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to create role");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    console.log(values);
    try {
      const { roleId, permissionName, status } = values;
      const response = await axios.post(
        `http://localhost:3000/rbac/roles/${roleId}/permissions`,
        { permissionName, status }
      );
      if (response.data) {
        message.success(
          "Role Based Permission successfully created or updated"
        );
        form.resetFields();
      } else {
        throw new Error("Failed to create or update permission");
      }
    } catch (error) {
      message.error(error.message || "Failed to create or update permission");
    }
  };

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const response = await axios.get("http://localhost:3000/rbac/roles");
      setRoles(response.data);
    };

    fetchRoles();
  }, []);

  return (
    <div className="w-[30rem] bg-white p-4 rounded-sm border border-gray-200">
      <strong className="flex w-full gap-1 text-2xl text-center text-fuchsia-800">
        <IoAccessibility /> Role-Permission Management
      </strong>
      <div className="flex flex-col gap-3 mt-4">
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Role Name"
            name="roleName"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select
              placeholder="Select a Role type"
              onChange={(value) => {
                const selectedRole = roles.find(
                  (role) => role.roleName === value
                );
                form.setFieldsValue({ roleId: selectedRole.roleId });
              }}
            >
              {roles.map((role) => (
                <Select.Option key={role._id} value={role.roleName}>
                  {role.roleName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Role ID" name="roleId">
            <Input placeholder="Choose a Role name" readOnly />
          </Form.Item>
          <Form.Item
            label="Permissions Name"
            name="permissionName"
            rules={[
              { required: true, message: "Please select a Permission Name" },
            ]}
          >
            <Select placeholder="Please select a Permission Name">
              <Select.Option value="Dashboard">Dashboard</Select.Option>
              <Select.Option value="User-List-Access">
                User-List-Access
              </Select.Option>
              <Select.Option value="Show-Transaction">
                Show-Transaction
              </Select.Option>
              <Select.Option value="Add-Vehicle-Entry">
                Add-Vehicle-Entry
              </Select.Option>
              <Select.Option value="Create-STS">Create-STS</Select.Option>
              <Select.Option value="Create-Landfill">
                Create-Landfill
              </Select.Option>
              <Select.Option value="STS-Entry">STS-Entry</Select.Option>
              <Select.Option value="Landfill-Entry">
                Landfill-Entry
              </Select.Option>
              <Select.Option value="Profile">Profile</Select.Option>
              <Select.Option value="Access-Roles">Access-Roles</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[
              {
                required: true,
                message: "Choose an option to give access or not",
              },
            ]}
          >
            <Select placeholder="Select Access Status">
              <Select.Option value={true}>Give Access</Select.Option>
              <Select.Option value={false}>Deny Access</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <div className="flex gap-2">
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{
                  backgroundColor: "green",
                  borderColor: "green",
                  fontSize: "15px",
                  height: "50px",
                }}
              >
                Submit
              </Button>

              <Button
                block
                onClick={showModal}
                style={{
                  backgroundColor: "#f14c36",
                  color: "white",
                  fontSize: "15px",
                  height: "50px",
                }}
                size="large"
              >
                Create New Role
              </Button>
            </div>
          </Form.Item>
        </Form>
        <Modal
          title={
            <div
              style={{
                textAlign: "center",
                fontSize: "25px",
                padding: "10px",
                fontWeight: "bold",
              }}
            >
              Create New Role !
            </div>
          }
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{
            style: { backgroundColor: "green", borderColor: "green" },
          }}
        >
          <Form form={form1} layout="vertical">
            <Form.Item
              label="Role ID"
              name="roleId"
              rules={[{ required: true, message: "Please input the role ID!" }]}
            >
              <Input placeholder="Enter a unique Role ID" />
            </Form.Item>
            <Form.Item
              label="Role Name"
              name="roleName"
              rules={[
                { required: true, message: "Please input the role name!" },
              ]}
            >
              <Input placeholder="Write The New User Role" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}