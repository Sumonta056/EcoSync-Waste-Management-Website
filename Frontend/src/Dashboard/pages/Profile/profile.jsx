import { Card } from "antd";
const { Meta } = Card;
import profile from "./profile.jpg";
export default function vehicle() {
  return (
    <div className="w-[29rem] bg-white p-4 rounded-sm border border-gray-200">
      <div className="flex justify-center mx-auto border-gray-200 rounded-sm border-x">
        <Card
          hoverable
          style={{
            width: 350,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)'
          }}
          cover={<img alt="example" src={profile} />}
        >
          <div style={{ textAlign: "center" }}>
            <Meta
              title={
                <span style={{ fontSize: "20px" }}>Sumonta Saha Mridul</span>
              }
              description={
                <span style={{ fontSize: "16px" }}>SYSTEM-ADMIN</span>
              }
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
