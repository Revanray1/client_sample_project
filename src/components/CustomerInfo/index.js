import React, { useEffect, useState } from 'react'
import './CustomerInfo.css'
import { fetchCustomerDetail } from '../../api/customerInfoApi';
import LoaderComponent from '../UiComponents/LoaderComponent';

const UserInfo = () => {
    const [activeTab, setActiveTab] = useState('BASIC DETAILS');
    const [customerData, setCustomerData] = useState([]);
    const [loader, setLoader] = useState(true);
    let userType = "Admin"

    const getCustomerDetails = async () => {
        try {
            const response = await fetchCustomerDetail();
            setCustomerData(response);
            setLoader(false)
        } catch (err) {
            console.error('Error fetching claim data:', err)
        }
    }

    useEffect(() => {
        getCustomerDetails()
    }, [])

    console.log(customerData[0]);

    return (
        <div className='w-100'>
            {loader ? <>
                <LoaderComponent />
            </>
                : <>  <h3 className='font-weight-bold pt-2'>Customer Info</h3>
                    <div className='m-2'>
                        <div className='shadow p-3  rounded' style={{ height: "auto", width: "100%", border: "2px solid grey", backgroundColor: "#1e3a8a" }}>
                            <div className='customer-info-container'>
                                <div className='customer-container-part-2'>
                                    <div class=" customer-info-name w-100 " style={{ color: "white" }}>
                                        <div className='ml-10'><h1>{customerData[0]?.billingName}</h1></div>
                                    </div>
                                </div>
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
                        </div>
                        <div className="tab-content">
                            {activeTab === 'BASIC DETAILS' && <>
                                <div style={{ display: "flex", margin: "2rem", gap: "19px" }}>
                                    <div className='table-container table-container-scroller'>
                                        {customerData.length > 0 && Object.entries(customerData[0]).map(([key, value]) => {
                                            return (<>
                                                <div class="row shadow-sm rounded" style={{ padding: "10px" }}>
                                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>{key.toUpperCase()}</div>
                                                    <div class="col-sm-6 fontsize-20" style={{ color: "grey" }}>{value}</div>
                                                </div>
                                            </>);
                                        })}

                                    </div>
                                </div>
                            </>}
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default UserInfo