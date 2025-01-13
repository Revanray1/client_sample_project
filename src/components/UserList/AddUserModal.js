import React, { useEffect, useState } from 'react'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addUser } from '../../api/userListApi';
import Loader from '../UiComponents/Loader';

const AddUserModal = ({ setIsAddUserModalOpen, handleAddUserData }) => {
    const [isDataSubmitted, setDataSubmitted] = useState(false)
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        userId: '',
        password: '',
        confirmPassword: '',
        // hintQuestion: '',
        // hintAnswer: '',
        customerID: '',
        isCustomerLogin: '',
        userId: ''
    })
    const [selectedHint, setSelectedHint] = useState()
    const [isPasswordVisible, setPasswordVisible] = useState(false)
    const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
    const [isvalidationError, setValidationError] = useState()
    const handlevalidation = () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (userData.firstName === '') {
            setValidationError("Please Enter First Name")
            return true
        }
        if (userData.lastName === '') {
            setValidationError("Please Enter Last Name")
            return true
        }
        if (userData.userName === '') {
            setValidationError("Please Enter Email")
            return true
        }
        if (!emailRegex.test(userData.userName)) {
            setValidationError("Please enter a valid email address");
            return true;
        }
        if (userData.password === '') {
            setValidationError("Please Enter Password")
            return true
        }
        if (userData.password.length < 8) {
            setValidationError("Password must be at least 8 characters long");
            return true;
        }
        if (!/[A-Z]/.test(userData.password)) {
            setValidationError("Password must contain at least one uppercase letter");
            return true;
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(userData.password)) {
            setValidationError("Password must contain at least one symbol");
            return true;
        }
        if (userData.confirmPassword === '') {
            setValidationError("Please Enter Confirm Password")
            return true
        }
        if (userData.password !== userData.confirmPassword) {
            setValidationError("Password and Confirm Password do not match")
            return true
        }
        if (selectedHint === '') {
            setValidationError("Please Select Hint Question")
            return true
        }
        if (userData.hintAnswer === '') {
            setValidationError("Please Enter Hint Answer")
            return true
        }
        if (userData.customerID === '') {
            setValidationError("Please Enter customerID")
            return true
        }
        if (userData.isCustomerLogin === '') {
            setValidationError("Please Select Customer Login Type")
            return true
        }
        setValidationError(false)
        return false

    }

    const addUserData = async() => {
        const IsError = handlevalidation()
        if (IsError) return
        delete userData.confirmPassword
        let createdDate = new Date().toISOString();
        const addUserData = { ...userData, emailID: userData.userName, email1: userData.userName, customer: userData.firstName + " " + userData.lastName, createdDate, createdByUserId: '0', loginUser: 'userName' }
        setDataSubmitted(true)

        try{
              const response = await addUser(addUserData)
              if(response.status === 200){
                setDataSubmitted(false)
                handleAddUserData()
                setIsAddUserModalOpen(false)
              }else{
                setDataSubmitted(false)
                console.log("User added Failed")
              }
            }catch(err){
              console.log(err)
              setDataSubmitted(false)
            }
        }

    useEffect(() => {
        const userId = localStorage.getItem('UserId');
        setUserData({ ...userData, customerID: userId })
    }, [])

    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <h4>Add User</h4>
                    <div className='modal-inner-container'>
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
                                    value={userData.lastName}
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
                                <label>Password</label>
                            </div>
                            <div className='col-md-5'>
                                <input
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    value={userData.password}
                                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
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
                                    value={userData.confirmPassword}
                                    onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
                                />

                            </div>
                            <div className='col-md-1' >
                                <FontAwesomeIcon onClick={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)} icon={isConfirmPasswordVisible ? faEye : faEyeSlash} className="nav-icon" />
                            </div>
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
                        disabled={selectedHint ? false : true}
                                type="text"
                                value={userData.hintAnswer}
                                onChange={(e) => setUserData({...userData, hintAnswer: e.target.value })}
                            />
                        </div>
                        <div className='col-md-1'></div>
                    </div> */}

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
                                    <option disabled selected>select Options</option>
                                    <option value="true">True</option>
                                    <option value="true">False</option>
                                </select>
                            </div>
                            <div className='col-md-1'></div>
                        </div>


                        <div className='row'>
                            <div className='col'>
                                {isvalidationError && <span style={{ color: "red" }}>{isvalidationError}</span>}
                            </div>
                        </div>

                        <div className='d-flex justify-content-evenly'>
                            
                            <button className="btn btn-primary" style={{height:"50px"}} onClick={() => { addUserData() }}>
                            {isDataSubmitted ?  <div class="spinner-border" role="status"></div>  : "Add User"}
                            </button>
                            <button className="btn btn-danger" onClick={() => { setIsAddUserModalOpen(false) }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddUserModal