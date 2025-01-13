import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
// import "./Grid.css";

const Grid = () => {
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'User' },
    { id: 4, name: 'Bob Brown', email: 'bob@example.com', role: 'User' },
    { id: 5, name: 'Charlie Green', email: 'charlie@example.com', role: 'Manager' },
    { id: 6, name: 'David Blue', email: 'david@example.com', role: 'Admin' },
  ]); // Static data

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Items per page
  const navigate = useNavigate();

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSave = () => {
    // Logic to save changes (e.g., update state)
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="container w-100 mt-5">
      <h3>User List</h3>
      <table className="table">
        <thead>
          <tr>
            <th>USER ID</th>
            <th>User Name</th>
            <th>Name</th>
            <th>CustomerLogin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.role}</td>
              <td>
                <button
                  className="btn btn-icon btn-sm"
                  onClick={() => handleEdit(row)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h4>Edit User</h4>
            <div>
              <label>ID:</label>
              <input type="text" value={selectedUser.id} readOnly />
            </div>
            <div>
              <label>Name:</label>
              <input type="text" value={selectedUser.name} readOnly />
            </div>
            <div>
              <label>Email:</label>
              <input type="text" value={selectedUser.email} readOnly />
            </div>
            <div>
              <label>Role:</label>
              <input
                type="text"
                value={selectedUser.role}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, role: e.target.value })
                }
              />
            </div>
            <div className='d-flex justify-content-evenly'>
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
            <button className="btn btn-secondary" onClick={handleCloseModal}>
              Cancel
            </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="pagination">
        <button 
          className="page-btn" 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
        >
          &laquo; Previous
        </button>
        <span className="page-info">Page {currentPage} of {totalPages}</span>
        <button 
          className="page-btn" 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
          disabled={currentPage === totalPages}
        >
          Next &raquo;
        </button>
      </div>
    </div>
  );
};

export default Grid;
