import React, { useState, useEffect } from 'react';
import './ClaimDetailView.css';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCustomerClaimDetails, fetchServiceLinesDetails, fetchEdiDetails } from '../../api/claimDetailsApi';
import ServiceLinesEdit from './ServiceLinesEditComponent';
import { formatDateToYYYYMMDD } from '../../utils/commonFunctions'
import { objectEach } from 'highcharts';


const ClaimDetailEdit = () => {
    const [activeTab, setActiveTab] = useState('CLAIM');
    const [claimData, setClaimData] = useState([]);
    const [isDisables, setDisabled] = useState(false);
    const [serviceLinesData, setServiceLinesData] = useState([]);
    const { claimId, claimNumber } = useParams();
    const [userType, setUserType] = useState(null);
    const [ediData, setEdiData] = useState([]);

    const getClaimDetails = async () => {
        try {
            const response = await fetchCustomerClaimDetails(claimId)
            setClaimData(response[0]);
        } catch (err) {
            console.error('Error fetching claim data:', err)
        }
    }

    const formatDate = (value) => {
        const dateArray = value.split("-");
        return `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`;
    }

    const handleInputChange = (event, tab) => {
        const { name, value, type } = event.target;
        const updatedValue = type === "date" ? formatDate(value) : value;
        if (tab === "CLAIM") {
            setClaimData({
                ...claimData,
                [name]: updatedValue
            });
        } else if (tab === "SERVICE") {
            const serviceData = serviceLinesData[0]
            const updatedServiceData = { ...serviceData, [name]: updatedValue }
            setServiceLinesData([updatedServiceData])
        }
    }

    const getServiceLinesDetails = async () => {
        try {
            const response = await fetchServiceLinesDetails(claimId)
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
                    {Object.entries(claimData).length > 0 ?
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
                                                    <div style={{ width: "50%" }}>
                                                        <input disabled={isDisables} type="text" name="claimId" value={(claimData?.claimId !== "" ? claimData?.claimId : "-")} onChange={(e) => handleInputChange(e, "CLAIM")} />
                                                    </div>
                                                    <div className='claimdetails-value'>CLAIM ID </div>
                                                </div>
                                                <div className='text-start'>
                                                    <div style={{ width: "50%" }}>
                                                        <input disabled={isDisables} type="text" name="claimFile" value={(claimData?.claimFile !== "" ? claimData?.claimFile : "-")} onChange={(e) => handleInputChange(e, "CLAIM")} />
                                                    </div>
                                                    <div className='claimdetails-value'>CLAIM FILE</div>
                                                </div>
                                                <div className='text-start'>
                                                    <div style={{ width: "50%" }}>
                                                        <input disabled={isDisables} type="text" name="claimNumber" value={(claimData?.claimNumber !== "" ? claimData?.claimNumber : "-")} onChange={(e) => handleInputChange(e, "CLAIM")} />
                                                    </div>

                                                    <div className='claimdetails-value'>CLAIM NUMBER</div>
                                                </div>
                                                <div className='text-start'>
                                                    <div style={{ width: "50%" }}>
                                                        <input disabled={isDisables} type="text" name="claimAmount" value={(claimData?.claimAmount !== "" ? claimData?.claimAmount : "-")} onChange={(e) => handleInputChange(e, "CLAIM")} />

                                                    </div>
                                                    <div className='claimdetails-value'>CHARGE AMOUNT [28]</div>
                                                </div>
                                                <div className='text-start' >
                                                    <div style={{ width: "50%" }}>
                                                        <input disabled={isDisables} type="text" name="placeOfService" value={(claimData?.placeOfService !== "" ? claimData?.placeOfService : "-")} onChange={(e) => handleInputChange(e, "CLAIM")} />
                                                    </div>
                                                    <div className='claimdetails-value'>PLACE OF SERVICE [24 b]</div>
                                                </div>
                                                <div className='text-start' >
                                                    <div style={{ width: "50%" }}>
                                                        <input disabled={isDisables} type="date" name="dateofService" value={(claimData?.dateofService !== "" ? formatDateToYYYYMMDD(claimData?.dateofService) : "-")} onChange={(e) => handleInputChange(e, "CLAIM")} />
                                                    </div>
                                                    <div className='claimdetails-value'>SERVICE DATE [24 a]</div>
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
                                                    <div >
                                                        <input style={{ width: "100%" }} disabled={isDisables} name="billingProviderNPI" type="text" value={(claimData?.billingProviderNPI !== "" ? claimData.billingProviderNPI : "-")} onChange={(e) => handleInputChange(e, "CLAIM")} />
                                                    </div>
                                                    <div className='claimdetails-value'>Billing Provider NPI [33 a]</div>
                                                </div>
                                                <div className="width-30 claim-detail-child-div-grid p-1" >
                                                    <div>
                                                        <input style={{ width: "100%" }} disabled={isDisables} type="text" name="renderingProviderNPI" value={(claimData?.renderingProviderNPI !== "" ? claimData.renderingProviderNPI : "-")} onChange={(e) => handleInputChange(e, "CLAIM")} />
                                                    </div>
                                                    <div className='claimdetails-value'>Rendering Provider NPI [24 j]</div>
                                                </div>
                                                <div className="width-30 claim-detail-child-div-grid p-1" >
                                                    <div>
                                                        <input style={{ width: "100%" }} disabled={isDisables} type="text" name="billingProviderAddress1" value={(claimData?.billingProviderAddress1 !== "" ? claimData.billingProviderAddress1 : "-")} onChange={(e) => handleInputChange(e, "CLAIM")} />
                                                    </div>
                                                    <div className='claimdetails-value'>Billing Provider Address [33]</div>
                                                </div>
                                                <div className="width-30 claim-detail-child-div-grid p-1" >
                                                    <div>
                                                        <input style={{ width: "100%" }} disabled={isDisables} type="text" name="renderingProviderName" value={(claimData?.renderingProviderName !== "" ? claimData.renderingProviderName : "-")} onChange={(e) => handleInputChange(e, "CLAIM")} />
                                                    </div>
                                                    <div className='claimdetails-value'> Rendering Provider Name [33]</div>
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
                                                    <div>
                                                        <input style={{ width: "100%" }} disabled={isDisables} type="text" name="payerName" value={(claimData?.payerName !== "" ? claimData.payerName : "-")} onChange={(e) => handleInputChange(e, "CLAIM")} />
                                                    </div>
                                                    <div className='claimdetails-value'>PAYER NAME [1]</div>
                                                </div>

                                                <div className="width-30 claim-detail-child-div-grid p-1" >
                                                    <div>
                                                        <input style={{ width: "100%" }} disabled={isDisables} type="text" name="payerAddress" value={(claimData?.payerAddress !== "" ? claimData.payerAddress : "-")} onChange={(e) => handleInputChange(e, "CLAIM")} />
                                                    </div>
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
                                                    <div>
                                                        <input style={{ width: "100%" }} disabled={isDisables} type="text" name="patientName" value={(claimData?.patientName !== "" ? claimData.patientName : "-")} onChange={(e) => handleInputChange(e, "CLAIM")} />

                                                    </div>
                                                    <div className='claimdetails-value'>NAME  [2]</div>
                                                </div>
                                                <div className="width-30 claim-detail-child-div-grid p-1" >
                                                    <div>
                                                        <input style={{ width: "100%" }} disabled={isDisables} type="text" name="memberId" value={(claimData?.memberId !== "" ? claimData.memberId : "-")} onChange={(e) => handleInputChange(e, "CLAIM")} />

                                                    </div>
                                                    <div className='claimdetails-value'>POLICY NUMBER [1 a]</div>
                                                </div>
                                                <div className="width-30 claim-detail-child-div-grid p-1" >
                                                    <div>
                                                        <input style={{ width: "100%" }} disabled={isDisables} type="text" name="patientGender" value={(claimData?.patientGender !== "" ? claimData.patientGender : "-")} onChange={(e) => handleInputChange(e, "CLAIM")} />

                                                    </div>
                                                    <div className='claimdetails-value'> GENDER [3]</div>
                                                </div>
                                                <div className="width-30 claim-detail-child-div-grid p-1" >
                                                    <div>
                                                        <input style={{ width: "100%" }} disabled={isDisables} type="date" name="patientDOB" value={(claimData?.patientDOB !== "" ? formatDateToYYYYMMDD(claimData.patientDOB) : "-")} onChange={(e) => handleInputChange(e, "CLAIM")} />

                                                    </div>
                                                    <div className='claimdetails-value'> DATE OF BIRTH [3]</div>
                                                </div>
                                                <div className="width-30 claim-detail-child-div-grid p-1" >
                                                    <div>
                                                        <input style={{ width: "100%" }} disabled={isDisables} type="text" name="subscriber" value={(claimData?.subscriber !== "" ? claimData.subscriber : "-")} onChange={(e) => handleInputChange(e, "CLAIM")} />

                                                    </div>
                                                    <div className='claimdetails-value'>SUBSCRIBER [4]</div>
                                                </div>
                                                <div className="width-30 claim-detail-child-div-grid p-1" >
                                                    <div>
                                                        <input style={{ width: "100%" }} disabled={isDisables} type="text" name="subscriberAddress" value={(claimData?.subscriberAddress !== "" ? claimData.subscriberAddress : "-")} onChange={(e) => handleInputChange(e, "CLAIM")} />

                                                    </div>
                                                    <div className='claimdetails-value'>Subscriber Address [7]</div>
                                                </div>

                                            </div>
                                        </div>
                                    </details>
                                </div>
                            </div>
                            <button className="btn btn-primary mt-2" onClick={() => { " handleSaveClaim()" }}>
                                SAVE
                            </button>
                        </div>
                        : <h3 className="section-header">No data Found</h3>
                    }
                </>);
            case 'SERVICE LINES':
                return (
                    <>
                        {serviceLinesData.length > 0 ?

                            <>
                                <div className='text-start'>
                                    <h5>{serviceLinesData[0]?.claimId ? `${serviceLinesData[0]?.claimId}` : ""} Claim  Box No - [24] </h5>
                                </div>


                                {serviceLinesData.map((data, index) => {
                                    return (<>
                                        <ServiceLinesEdit data={data} index={index} handleInputChange={handleInputChange} />
                                    </>)
                                })}

                                <button className="btn btn-primary mt-2" onClick={() => { " handleSaveClaim()" }}>
                                    SAVE
                                </button></> : <> No Data Found</>}

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
                <button
                    className={`tab ${activeTab === 'SERVICE LINES' ? 'active' : ''}`}
                    onClick={() => setActiveTab('SERVICE LINES')}
                >
                    SERVICE LINES ({serviceLinesData.length})
                </button>
                {(userType && userType === 'Admin') && <button
                    className={`tab ${activeTab === 'EDI VIEW' ? 'active' : ''}`}
                    onClick={() => setActiveTab('EDI VIEW')}
                >
                    EDI VIEW
                </button>}

            </div>
            <div className="tab-content">
                {(claimData && Object.keys(claimData).length !== 0) && renderTabContent()}
            </div>
        </div>
    );
};

export default ClaimDetailEdit;