import { layouts } from 'chart.js'
import React, { useState } from 'react'

const EditUserModal = ({ selectedUser, setSelectedUser, handleSave, handleCloseModal }) => {
    // const [userData, setUserData] = useState({
    //     firstName: '',
    //     lastName: '',
    //     email: '',
    //     userId:'',
    //     password: '',
    // })

    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <h4>Edit User</h4>
                    <div className='modal-inner-container'>
                        <div className='row'>
                            <div className='col-md-1'></div>
                            <div className='col-md-5'>
                                <label>ID:</label>
                            </div>
                            <div className='col-md-5'>
                                <input
                                    required="true"
                                    type="text"
                                    value={selectedUser.id}
                                    readOnly
                                />
                            </div>
                            <div className='col-md-1'></div>

                        </div>
                        <div className='row'>
                            <div className='col-md-1'></div>
                            <div className='col-md-5'>
                                <label>Name:</label>
                            </div>
                            <div className='col-md-5'>
                                <input
                                    required="true"
                                    type="text"
                                    value={selectedUser.name}
                                    readOnly
                                />
                            </div>
                            <div className='col-md-1'></div>

                        </div>
                        <div className='row'>
                            <div className='col-md-1'></div>
                            <div className='col-md-5'>
                                <label>Email:</label>
                            </div>
                            <div className='col-md-5'>
                                <input
                                    required="true"
                                    type="text"
                                    value={selectedUser.email}
                                    readOnly
                                />
                            </div>
                            <div className='col-md-1'></div>

                        </div>
                        <div className='row'>
                            <div className='col-md-1'></div>
                            <div className='col-md-5'>
                                <label>Role:</label>
                            </div>
                            <div className='col-md-5'>
                                <input
                                    required="true"
                                    type="text"
                                    value={selectedUser.role}
                                    onChange={(e) =>
                                        setSelectedUser({ ...selectedUser, role: e.target.value })
                                    }
                                />
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