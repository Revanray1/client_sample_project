import React, { useState, useEffect } from 'react';
import './ClaimDetailView.css';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCustomerClaimDetails, fetchServiceLinesDetails, fetchEdiDetails } from '../../api/claimDetailsApi';
import ServiceLines from './ServiceLinesComponent';

const ClaimDetailView = () => {
    const [activeTab, setActiveTab] = useState('CLAIM');
    const [data, setData] = useState([]);
    const [serviceLinesData, setServiceLinesData] = useState([]);
    const { claimId, claimNumber } = useParams();
    const [userType, setUserType] = useState(null);
    const [ediData, setEdiData] = useState([]);

    const getClaimDetails = async (id) => {
        try {
            const response = await fetchCustomerClaimDetails(id)
            setData(response[0]);
        } catch (err) {
            console.error('Error fetching claim data:', err)
        }
    }

    const getServiceLinesDetails = async (id) => {
        try {
            const response = await fetchServiceLinesDetails(id)
            setServiceLinesData(response)
        } catch (err) {
            console.error('Error fetching claim data:', err)
        }
    }
    const getEdiDetails = async (id) => {
        try {
            const response = await fetchEdiDetails(id)
            if (response.ediContent !== "") {
                const ediContent = response.ediContent.split('~').filter(line => line.trim() !== "");
                setEdiData(ediContent);
            }
        } catch (err) {
            console.error('Error fetching claim data:', err)
        }
    }
    useEffect(() => {
        getClaimDetails(claimId)
        getServiceLinesDetails(claimId)
        getEdiDetails(claimNumber)

    }, []);
    useEffect(() => {
        const user = localStorage.getItem('userType');
        setUserType(user)
    }, []);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'CLAIM':
                return (<>
                    <div >
                        <div >
                            <div className='mt-3'>
                                <details className='details'>
                                    <summary className='claimdetails-summary-header'>
                                        <div className='font-weight-bold fontsize-12 d-flex'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                            </svg>
                                            <span>KEY INFO</span>
                                        </div>
                                    </summary>

                                    <div className='mt-3 overflow-auto'>
                                        <div className='claim-detail-summary-outerdiv'>
                                            <div className='text-start'>
                                                <div>{(data?.claimId !== "" ? data?.claimId : "-")}</div>
                                                <div className='claimdetails-value'>CLAIM ID </div>
                                            </div>
                                            <div className='text-start'>
                                                <div>{(data?.claimFile !== "" ? data?.claimFile : "-")}</div>
                                                <div className='claimdetails-value'>CLAIM FILE</div>
                                            </div>
                                            <div className='text-start'>
                                                <div>{data?.claimNumber === "" ? "-" : data?.claimNumber}</div>
                                                <div className='claimdetails-value'>CLAIM NUMBER</div>
                                            </div>
                                            <div className='text-start'>
                                                <div>{data?.claimAmount === "" ? "-" : Number(data?.claimAmount).toFixed(2)}</div>
                                                <div className='claimdetails-value'>CHARGE AMOUNT  <span className='color-filenumber'>[28]</span></div>
                                            </div>
                                            <div className='text-start'>
                                                <div>{data?.placeOfService === "" ? "-" : data?.placeOfService}</div>
                                                <div className='claimdetails-value'>PLACE OF SERVICE <span className='color-filenumber'>[24 b]</span></div>
                                            </div>
                                            <div className='text-start'>
                                                <div>{(data?.dateofService ? (data?.dateofService.split(" "))[0] : "-")}</div>
                                                <div className='claimdetails-value'>SERVICE DATE <span className='color-filenumber'>[24 a]</span></div>
                                            </div>

                                        </div>
                                    </div>
                                </details>


                                <details className='details'>
                                    <summary className='claimdetails-summary-header mt-3'>
                                        <div className='font-weight-bold fontsize-12 d-flex'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                            </svg>
                                            <span>BILLING PROVIDER</span>
                                        </div>
                                    </summary>

                                    <div className='mt-3 overflow-auto'>
                                        <div className='claim-detail-child-div'>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{data?.billingProviderNPI === "" ? "-" : data?.billingProviderNPI}</div>
                                                <div className='claimdetails-value'>Billing Provider NPI <span className='color-filenumber'>[33 a]</span></div>
                                            </div>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{data?.renderingProviderNPI === "" ? "-" : data?.renderingProviderNPI}</div>
                                                <div className='claimdetails-value'>Rendering Provider NPI <span className='color-filenumber'>[24 j]</span></div>
                                            </div>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{data?.billingProviderAddress1 === "" ? "-" : data?.billingProviderAddress1}</div>
                                                <div className='claimdetails-value'>Billing Provider Address <span className='color-filenumber'>[33]</span></div>
                                            </div>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{data?.renderingProviderName === "" ? "-" : data?.renderingProviderName}</div>
                                                <div className='claimdetails-value'> Rendering Provider Name <span className='color-filenumber'>[33]</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </details>


                                <details className='details'>
                                    <summary className='claimdetails-summary-header mt-3'>
                                        <div className='font-weight-bold fontsize-12 d-flex'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                            </svg>
                                            <span>PAYER</span>
                                        </div>
                                    </summary>

                                    <div className='mt-3 overflow-auto'>
                                        <div className='claim-detail-child-div'>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{data?.payerName === "" ? "-" : data?.payerName}</div>
                                                <div className='claimdetails-value'>PAYER NAME <span className='color-filenumber'>[1]</span></div>
                                            </div>

                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{data?.payerAddress === "" ? "-" : data?.payerAddress}</div>
                                                <div className='claimdetails-value'>Payer Address</div>
                                            </div>
                                        </div>
                                    </div>
                                </details>



                                <details className='details'>
                                    <summary className='claimdetails-summary-header mt-3'>
                                        <div className='font-weight-bold fontsize-12 d-flex'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                            </svg>
                                            <span>PATIENT INFO</span>
                                        </div>
                                    </summary>

                                    <div className='mt-3 overflow-auto'>
                                        <div className='claim-detail-child-div'>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{(data?.patientName === "") ? "-" : data.patientName}</div>
                                                <div className='claimdetails-value'>NAME  <span className='color-filenumber'>[2]</span></div>
                                            </div>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{data?.memberId === "" ? "-" : data?.memberId}</div>
                                                <div className='claimdetails-value'>POLICY NUMBER <span className='color-filenumber'>[1 a]</span></div>
                                            </div>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{data?.patientGender === "" ? "-" : data?.patientGender}</div>
                                                <div className='claimdetails-value'> GENDER <span className='color-filenumber'>[3]</span></div>
                                            </div>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{data?.patientDOB === "" ? "-" : (data?.patientDOB?.split(" "))[0]}</div>
                                                <div className='claimdetails-value'> DATE OF BIRTH<span className='color-filenumber'>[3]</span></div>
                                            </div>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{data?.subscriber === "" ? "-" : data?.subscriber}</div>
                                                <div className='claimdetails-value'>SUBSCRIBER <span className='color-filenumber'>[4]</span></div>
                                            </div>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{data?.subscriberAddress === "" ? "-" : data?.subscriberAddress}</div>
                                                <div className='claimdetails-value'>Subscriber Address <span className='color-filenumber'>[7]</span></div>
                                            </div>

                                        </div>
                                    </div>
                                </details>
                            </div>
                        </div>
                    </div>
                </>);
                // case 'SERVICE LINES':
                return (
                    <>
                        {serviceLinesData.length > 0 ?

                            <>
                                <div className='text-start'>
                                    <h5>{serviceLinesData[0]?.claimId ? `${serviceLinesData[0]?.claimId}` : ""} Claim  Box No - [24] </h5>
                                </div>


                                {serviceLinesData.map((data, index) => {
                                    return (
                                        <ServiceLines data={data} index={index} />
                                    )
                                })}
                            </> : <> No Data Found</>}
                    </>);
            case 'EDI VIEW':
                return (
                    <div className="section ">
                        {ediData.length > 0 ?
                            <>
                                <h3 className="section-header">EDI VIEW CONTENT</h3>
                                <div className="section-details custom-scroll text-start">

                                    {ediData.map((line, index) => (
                                        <p key={index}>{line}</p>
                                    ))}
                                </div>
                            </> : <h3 className="section-header">No data Found</h3>}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="claim-detail">
            <h2 className="claim-header">Claim Details</h2>
            <div className="tabs">

                <button
                    className={`tab ${activeTab === 'CLAIM' ? 'active' : ''}`}
                    onClick={() => setActiveTab('CLAIM')}
                >
                    CLAIM
                </button>
                {/* <button
                    className={`tab ${activeTab === 'SERVICE LINES' ? 'active' : ''}`}
                    onClick={() => setActiveTab('SERVICE LINES')}
                >
                    SERVICE LINES ({serviceLinesData.length})
                </button> */}
                {(userType && userType === 'Admin') && <button
                    className={`tab ${activeTab === 'EDI VIEW' ? 'active' : ''}`}
                    onClick={() => setActiveTab('EDI VIEW')}
                >
                    EDI VIEW
                </button>}

            </div>
            <div className="tab-content">
                {(data && Object.keys(data).length !== 0) && renderTabContent()}
            </div>



            {
                activeTab === 'CLAIM' &&
                (<>
                    <div className="tabs" style={{ float: "left", width: '100%' }}>
                        <button
                            style={{ width: '30%' }}
                            className={`tab active`}
                        >
                            SERVICE LINES ({serviceLinesData.length})
                        </button>

                    </div>

                    <div className="tab-content">
                        {serviceLinesData.length > 0 ?

                            <>
                                <div className='text-start'>
                                    <h5>{serviceLinesData[0]?.claimId ? `${serviceLinesData[0]?.claimId}` : ""} Claim  Box No - [24] </h5>
                                </div>


                                {serviceLinesData.map((data, index) => {
                                    return (
                                        <ServiceLines data={data} index={index} />
                                    )
                                })}
                            </> : <> No Data Found</>}
                    </div>
                </>)

            }


        </div>
    );
};

export default ClaimDetailView;