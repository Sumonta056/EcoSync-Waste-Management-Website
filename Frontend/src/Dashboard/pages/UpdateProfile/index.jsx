import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserForm({ userId }) {
  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`/user/${userId}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [userId]);

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`/user/${userId}`, userData)
      .then(response => {
        setMessage('Update successful');
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={userData.name || ''} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={userData.email || ''} onChange={handleChange} />
      </label>
      <input type="submit" value="Update" />
      {message && <p>{message}</p>}
    </form>
  );
}

export default UserForm;