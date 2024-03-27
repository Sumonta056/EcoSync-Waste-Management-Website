import { useState, useEffect } from "react";
import axios from "axios";
import { getRoleStatus } from "./roles.jsx";
import { Modal, Button } from "antd";
import { Tag } from "antd";
import { FaUserSecret } from "react-icons/fa";

export default function History() {
  const [RolesData, setRolesData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [permissions, setPermissions] = useState([]);

  const showModal = async (roleId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/rbac/roles/${roleId}/permissions`
      );
      setPermissions(response.data);
      setIsModalVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const RolesResponse = await axios.get(
          "http://localhost:3000/rbac/roles"
        );
        if (Array.isArray(RolesResponse.data)) {
          setRolesData(RolesResponse.data);
        } else {
          console.error("Received Roles data is not an array.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Render table with Roles data and STS managers
  return (
    <div className="flex-1 px-4 pt-3 pb-4 bg-white border border-gray-200 rounded-sm">
      <strong className="flex justify-between gap-2 px-4 mx-auto text-2xl text-center text-green-700">
        <div className="flex gap-2"><FaUserSecret /> Available User Roles </div>
        
      </strong>
      <div className="mt-3 border-gray-200 rounded-sm border-x">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>Role Id</th>
              <th>Role Name</th>
              <th>Permission Access</th>
            </tr>
          </thead>
          <tbody>
            {RolesData.map((Roles) => (
              <tr key={Roles._id}>
                <td>{Roles.roleId}</td>
                <td>{getRoleStatus(`${Roles.roleName}`)}</td>
                <td>
                  <Button
                    onClick={() => showModal(Roles.roleId)}
                    style={{ backgroundColor: "#571c57", color: "white" }}
                    size="large"
                  >
                    View Permissions
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>

          <Modal
            title={
              <div
                style={{
                  textAlign: "center",
                  fontSize: "30px",
                  padding: "10px",
                  fontWeight: "bold",
                }}
              >
                Permission Access
              </div>
            }
            visible={isModalVisible}
            onCancel={handleCancel}
            onOk={handleOk}
            okButtonProps={{
              style: { backgroundColor: "green", borderColor: "green" },
            }}
          >
            {permissions.map((permission) => (
              <Tag
                key={permission._id}
                style={{
                  display: "block",
                  width: "100%",
                  height: "50px",
                  lineHeight: "50px",
                  marginBottom: "10px",
                  textAlign: "center",
                  fontSize: "1rem",
                }}
              >
                {getRoleStatus(`${permission.permissionName}`)}
              </Tag>
            ))}
          </Modal>
        </table>
      </div>
    </div>
  );
}
