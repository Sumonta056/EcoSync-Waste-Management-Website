import { useState, useEffect } from 'react';
import { Card } from 'antd';
import axios from 'axios';
import { KJUR } from 'jsrsasign';
import profile from './profile.jpg';

const { Meta } = Card;

export default function Vehicle() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    let userId = null;

    if (token) {
      const decodedToken = KJUR.jws.JWS.parse(token);
      userId = decodedToken.payloadObj?.id;
    }

    axios
      .post('http://localhost:3000/profile', { id: userId })
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[29rem] bg-white p-4 rounded-sm border border-gray-200">
      <div className="flex justify-center mx-auto border-gray-200 rounded-sm border-x">
        <Card
          hoverable
          style={{
            width: 350,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
          }}
          cover={<img alt="example" src={profile} />}
        >
          <div style={{ textAlign: 'center' }}>
            <Meta
              title={<span style={{ fontSize: '20px' }}>{userData.name}</span>}
              description={
                <span style={{ fontSize: '16px' }}>{userData.role}</span>
              }
            />
          </div>
        </Card>
      </div>
    </div>
  );
}