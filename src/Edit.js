// src/components/Edit.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({ id: '', name: '', email: '', role: '' });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch data from the API
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => response.json())
      .then(data => {
        // Format the data to match the expected structure
        const formattedData = {
          id: data.id,
          name: data.name,
          email: data.email,
          role: 'User' // Adjust this field as necessary
        };
        setData(formattedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save data logic here
    const storedData = JSON.parse(localStorage.getItem('data')) || [];
    const updatedData = storedData.map((item) => (item.id === data.id ? data : item));
    localStorage.setItem('data', JSON.stringify(updatedData));
    
    // Set success message and navigate back to grid
    setSuccessMessage('Update Successfully');
    setTimeout(() => {
      navigate('/grid');
    }, 2000); // Redirect after 2 seconds
  };

  return (
    <div className="container mt-5">
      <h3>Edit Row</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>ID</label>
          <input type="text" className="form-control" value={data.id} disabled />
        </div>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Role</label>
          <input
            type="text"
            className="form-control"
            name="role"
            value={data.role}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
      {successMessage && (
        <div className="alert alert-success mt-3" role="alert">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default Edit;
