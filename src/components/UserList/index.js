import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit , faEye} from '@fortawesome/free-solid-svg-icons';
import "./UserList.css";
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal'
import { fetchAllUserList } from '../../api/UserApi';
import { DateAndTimeToDAte } from '../../utils/commonFunctions';
import ViewUserModal from './ViewUserModal';
import LoaderComponent from '../UiComponents/LoaderComponent';
import ToggleComponent from '../UiComponents/ToggleComponent';

const UserList = () => {
  const [data, setData] = useState([]); // Static data
  const [loader, setLoader] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isViewUserModalOpen, setIsViewUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Items per page
  const navigate = useNavigate();

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    // setIsModalOpen(true);
  };

  const handleView= (user) => {
    setSelectedUser(user);
    setIsViewUserModalOpen(true);
    // setIsModalOpen(true);
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
  const currentItems = data.length > 0 && data.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleAddUserData = async () => {
    handleGetAllUser()
  }
  const handleGetAllUser = async () => {
    setLoader(true)
    const response = await fetchAllUserList()
    if (response.status === 200) {
      setLoader(false)
      setData(response.data)
    }else {
      setLoader(false)
      console.error('Error fetching user data:', response.statusText)
    }

  }

  useEffect(() => {
    handleGetAllUser()
  }, [])

  return (
    <>{loader ? <LoaderComponent/> : 
    <div className="userlist-container">
      <h4 className='userlist-headertext'>User List</h4>
      <div className='text-end mb-2'>
        <button type="button" class="btn btn-primary" onClick={() => { setIsAddUserModalOpen(true) }}>+ ADD USER</button>
      </div>
      <div className='shadow p-2'>

        <table className="table">
          <thead>
            <tr>
              <th >User Id</th>
              <th>User Name</th>
              <th>Name</th>
              <th>CustomerLogin</th>
              <th>Created By</th>
              <th>Created Date</th>
              <th>Actions</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 && currentItems.map((row, key) => (
              <tr key={key}>
                <td >{row.userId}</td>
                <td >{row.userName}</td>
                <td >{row.firstName + " " + row.lastName}</td>
                <td >{row.isCustomerLogin}</td>
                <td >{row.createdBy}</td>
                <td >{DateAndTimeToDAte(row.createdDate)}</td>
                <td >
                  <button
                    className="btn btn-icon btn-sm"
                    onClick={() => handleEdit(row)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="btn btn-icon btn-sm"
                    onClick={() => handleView(row)}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </td>
                <td >
                <ToggleComponent  index={key} value={row.status}/>
               </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


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
      {isAddUserModalOpen && <AddUserModal setIsAddUserModalOpen={setIsAddUserModalOpen} handleAddUserData={handleAddUserData} />}
      {isModalOpen && (<EditUserModal selectedUser={selectedUser} setSelectedUser={setSelectedUser} handleSave={handleSave} handleCloseModal={handleCloseModal} />)}
      {isViewUserModalOpen && (<ViewUserModal setIsViewUserModalOpen={setIsViewUserModalOpen} selectedUser={selectedUser} />)}
    </div>}
    </>);
};

export default UserList;