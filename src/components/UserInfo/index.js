import { faUser, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import './UserInfo.css'

const UserInfo = () => {
    const [activeTab, setActiveTab] = useState('BASIC DETAILS');
    let userType = "Admin"
    return (
        <div className='w-100 p-2'>
            <h2 className='font-weight-bold pt-2'>User Details</h2>

            <div className='shadow p-3 mb-5  rounded' style={{ height: "auto", width: "100%", border: "2px solid grey", backgroundColor: "#1e3a8a" }}>
                <div className='user-info-container'>
                    <div className='w-50'>
                        <img src="https://media.istockphoto.com/id/1295870150/photo/hipster-sitting-at-kitchen-table-working.jpg?s=1024x1024&w=is&k=20&c=YtxKCjBj9deDhl-zYTvB3TslMBBxl8CjIN1PtxzdOYY=" alt="User Profile Pic" style={{ borderRadius: "50%", objectFit: "cover", height: "150px", width: "150px" }} />
                        {/* <img src="https://via.placeholder.com/150" alt="User Profile Pic" style={{ borderRadius: "50%", objectFit: "cover", height: "150px", width: "150px" }} /> */}
                    </div>
                    <div className='user-container-part-2'>
                        <div class=" user-info-name w-100 d-flex" style={{ color: "white" }}>

                            <div className='user-info-name-div'>
                                <div>
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                <div className='ml-10'>Jhon Kennady</div>
                            </div>
                        </div>
                        <div class=" fontsize-20 w-100" style={{ color: "white" }}><div className='user-info-name-div'><div ><FontAwesomeIcon icon={faEnvelope} /></div><div className='user-info-child-div'>jhonKennady@.com</div></div></div>
                        <div class=" fontsize-20 w-100" style={{ color: "white" }}><div className='user-info-name-div'><div ><FontAwesomeIcon icon={faPhone} /></div><div className='user-info-child-div'>9939494949494</div></div></div>
                    </div>
                </div>
            </div>
            <div className="claim-detail">

                <div className="tabs">

                    <button
                        className={`tab ${activeTab === 'BASIC DETAILS' ? 'active' : ''}`}
                        onClick={() => setActiveTab('BASIC DETAILS')}
                    >
                        BASIC DETAILS
                    </button>
                    <button
                        className={`tab ${activeTab === 'ACCOUNT DETAILS' ? 'active' : ''}`}
                        onClick={() => setActiveTab('ACCOUNT DETAILS')}
                    >
                        ACCOUNT DETAILS
                    </button>
                    <button
                        className={`tab ${activeTab === 'PERSONAL INFO' ? 'active' : ''}`}
                        onClick={() => setActiveTab('PERSONAL INFO')}
                    >
                        PERSONAL INFO
                    </button>

                </div>
                <div className="tab-content">
                    {activeTab === 'BASIC DETAILS' && <>
                        <div style={{ display: "flex", margin: "2rem", gap: "19px" }}>
                            <div className='table-container table-container-scroller'>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>BASIC DETAILS</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>BASIC DETAILS</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Name</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Jhon Kennady</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>First Name</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Jhon</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Last Name</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Kennady</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Age</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>25</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Address</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>12,street, nagar, state,country, pincode</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Education</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>MAster's in Degree</div>
                                </div>


                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Id</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>2234</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Name</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Jhon Kennady</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>First Name</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Jhon</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Last Name</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Kennady</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Age</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>25</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Address</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>12,street, nagar, state,country, pincode</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Education</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>MAster's in Degree</div>
                                </div>

                            </div>
                        </div>
                    </>}
                    {activeTab === 'ACCOUNT DETAILS' && <>
                        <div style={{ display: "flex", margin: "2rem", gap: "19px" }}>
                            <div className='table-container table-container-scroller'>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>ACCOUNT DETAILS</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>ACCOUNT DETAILS DETAILS34</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Name</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Jhon Kennady</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>First Name</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Jhon</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Last Name</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Kennady</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Age</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>25</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Address</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>12,street, nagar, state,country, pincode</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Education</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>MAster's in Degree</div>
                                </div>


                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Id</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>2234</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Name</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Jhon Kennady</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>First Name</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Jhon</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Last Name</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Kennady</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Age</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>25</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Address</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>12,street, nagar, state,country, pincode</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Education</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>MAster's in Degree</div>
                                </div>

                            </div>
                        </div>
                    </>}
                    {activeTab === 'PERSONAL INFO' && <>
                        <div style={{ display: "flex", margin: "2rem", gap: "19px" }}>
                            <div className='table-container table-container-scroller'>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>PERSONAL INFO</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>PERSONAL INFO</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>PERSONAL INFO</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>PERSONAL INFO</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>First Name</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Jhon</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Last Name</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Kennady</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Age</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>25</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Address</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>12,street, nagar, state,country, pincode</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Education</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>MAster's in Degree</div>
                                </div>


                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Id</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>2234</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Name</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Jhon Kennady</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>First Name</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Jhon</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Last Name</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Kennady</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Age</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>25</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Address</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>12,street, nagar, state,country, pincode</div>
                                </div>
                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>Education</div>
                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>MAster's in Degree</div>
                                </div>

                            </div>
                        </div>
                    </>}
                </div>
            </div>


        </div>
    )
}

export default UserInfo