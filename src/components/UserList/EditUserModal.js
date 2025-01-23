import React, { useState } from 'react'
import ToggleComponent from '../UiComponents/ToggleComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const EditUserModal = ({ selectedUser, setSelectedUser, handleSave, handleCloseModal }) => {
    const [userData, setUserData] = useState(selectedUser)
    const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
    const [isPasswordVisible, setPasswordVisible] = useState(false)
    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <h4>Edit User</h4>
                    <div className='modal-inner-container'>
                        <div className='row'>
                            <div className='col-md-1'></div>
                            <div className='col-md-5'>
                                <label>ID</label>
                            </div>
                            <div className='col-md-5'>
                                <input
                                    required="true"
                                    type="text"
                                    value={userData.userId}
                                    disabled
                                />
                            </div>
                            <div className='col-md-1'></div>

                        </div>
                        <div className='row'>
                            <div className='col-md-1'></div>
                            <div className='col-md-5'>
                                <label>First Name </label>
                            </div>
                            <div className='col-md-5'>
                                <input
                                    required="true"
                                    type="text"
                                    value={userData.firstName}
                                    onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                                />

                            </div>
                            <div className='col-md-1'></div>

                        </div>

                        <div className='row'>
                            <div className='col-md-1'></div>
                            <div className='col-md-5'>
                                <label>Last Name:</label>
                            </div>
                            <div className='col-md-5'>
                                <input
                                    type="text"
                                    value={selectedUser.lastName}
                                    onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                                />

                            </div>
                            <div className='col-md-1'></div>
                        </div>

                        <div className='row'>
                            <div className='col-md-1'></div>
                            <div className='col-md-5'>
                                <label>User Name</label>
                            </div>
                            <div className='col-md-5'>
                                <input
                                    type="email"
                                    value={userData.userName}
                                    onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
                                />

                            </div>
                            <div className='col-md-1'></div>
                        </div>

                        <div className='row'>
                        <div className='col-md-1'></div>
                            <div className='col-md-5'>
                                <label>Customer Id</label>
                            </div>
                            <div className='col-md-5'>
                                <input
                                    disabled
                                    type="text"
                                    value={userData.customerID}
                                    onChange={(e) => setUserData({ ...userData, customerID: e.target.value })}
                                />

                            </div>
                            <div className='col-md-1'></div>
                    </div>


                    <div className='row'>
                            <div className='col-md-1'></div>
                            <div className='col-md-5'>
                                <label>Customer Login</label>
                            </div>
                            <div className='col-md-5'>
                                <select class="form-select" aria-label="Default select example" onChange={(e) => setUserData({ ...userData, isCustomerLogin: e.target.value })}>
                                    <option disabled >select Options</option>
                                    <option selected={userData.isCustomerLogin === '"True"' ? true : false } value="True">True</option>
                                    <option selected={userData.isCustomerLogin === 'False' ? true : false } value="False">False</option>
                                </select>
                            </div>
                            <div className='col-md-1'></div>
                        </div>


                        <div className='row'>
                            <div className='col-md-1'></div>
                            <div className='col-md-5'>
                                <label>Password</label>
                            </div>
                            <div className='col-md-5'>
                                <input
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    value={'password'}
                                    // onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                />

                            </div>
                              <div className='col-md-1' >
                                  <FontAwesomeIcon onClick={() => setPasswordVisible(!isPasswordVisible)} icon={isPasswordVisible ? faEye : faEyeSlash} className="nav-icon" />
                              </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-1'></div>
                            <div className='col-md-5'>
                                <label>Confirm Password</label>
                            </div>
                            <div className='col-md-5'>
                                <input
                                    type={isConfirmPasswordVisible ? 'text' : 'password'}
                                    value={'password'}
                                    // onChange={(e)=>setUserData({ ...userData, createdDate: e.target.value })}
                                />

                            </div>
                            <div className='col-md-1' >
                                <FontAwesomeIcon onClick={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)} icon={isConfirmPasswordVisible ? faEye : faEyeSlash} className="nav-icon" />
                            </div>
                        </div>






                        <div className='row'>
                            <div className='col-md-1'></div>
                            <div className='col-md-5'>
                                <label>Status</label>
                            </div>
                            <div className='col-md-5 ' >
                              <ToggleComponent />
                            </div>
                            <div className='col-md-1'></div>

                        </div>
                        <div className='d-flex justify-content-evenly'>
                            <button className="btn btn-primary" onClick={handleSave}>
                                Save
                            </button>
                            <button className="btn btn-danger" onClick={handleCloseModal}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditUserModal