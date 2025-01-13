import React, { useState } from 'react'

const ViewUserModal = ({ setIsViewUserModalOpen , selectedUser}) => {
    const [userData, setUserData] = useState(selectedUser)
    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <h4>View User Details</h4>
                <div  className='modal-inner-container'>
                    <div className='row'>
                        <div className='col-md-1'></div>
                        <div className='col-md-5'>
                            <label>First Name </label>
                        </div>
                        <div className='col-md-5'>
                            <input
                                disabled
                                required="true"
                                type="text"
                                value={userData.firstName}
                            onChange={(e) => setUserData({...userData, firstName: e.target.value })}
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
                                disabled
                                type="text"
                                value={userData.lastName}
                            onChange={(e) => setUserData({...userData, lastName: e.target.value })}
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
                                disabled
                                type="email"
                                value={userData.userName}
                            />

                        </div>
                        <div className='col-md-1'></div>
                    </div>
                    <div className='row'>
                        <div className='col-md-1'></div>
                            <div className='col-md-5'>
                                <label>User Id</label>
                            </div>
                            <div className='col-md-5'>
                                <input
                                    disabled
                                    type="text"
                                    value={userData.userId}
                                onChange={(e) => setUserData({...userData, userId: e.target.value })}
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
                                <input
                                    disabled
                                    type="text"
                                    value={userData.isCustomerLogin}
                                />

                            </div>
                            <div className='col-md-1'></div>
                        </div>

                        <div className='row'>
                            <div className='col-md-1'></div>
                            <div className='col-md-5'>
                                <label>Created By</label>
                            </div>
                            <div className='col-md-5'>
                                <input
                                    disabled
                                    type="text"
                                    value={userData.createdBy}
                                />

                            </div>
                            <div className='col-md-1'></div>
                        </div>

                        <div className='row'>
                            <div className='col-md-1'></div>
                            <div className='col-md-5'>
                                <label>Created Date</label>
                            </div>
                            <div className='col-md-5'>
                                <input
                                    disabled
                                    type="text"
                                    value={userData.createdDate.split('T')[0]}
                                />

                            </div>
                            <div className='col-md-1'></div>
                        </div>

                    {/* <div className='row'>
                        <div className='col-md-1'></div>
                        <div className='col-md-5'>
                            <label>Hint Question</label>
                        </div>
                        <div className='col-md-5'>
                        <select class="form-select" aria-label="Default select example" onChange={(e)=>setSelectedHint(e.target.value)}>
                        <option disabled selected>select Hint Questions</option>
                        <option value="color">Favourite Color</option>
                        <option value="bike">Favourite bike</option>
                        <option value="place">Favourite place</option>
                        </select>
                        </div>
                        <div className='col-md-1'></div>
                    </div>
                    <div className='row'>
                        <div className='col-md-1'></div>
                        <div className='col-md-5'>
                            <label>Hint Answer</label>
                        </div>
                        <div className='col-md-5'>
                        <input
                            disabled
                        disabled={selectedHint ? false : true}
                                type="text"
                                value={userData.hintAnswer}
                                onChange={(e) => setUserData({...userData, hintAnswer: e.target.value })}
                            />
                        </div>
                        <div className='col-md-1'></div>
                    </div> */}
                    <div className='row'>
                        <div className='col'>
                        </div>
                    </div>

                    <div className='d-flex justify-content-evenly'>
                        <button className="btn btn-danger" onClick={() => { setIsViewUserModalOpen(false) }}>
                            Close
                        </button>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default ViewUserModal