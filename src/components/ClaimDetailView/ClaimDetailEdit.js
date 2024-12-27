import React, { useState, useEffect } from 'react';
import './ClaimDetailView.css';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCustomerClaimDetails, fetchServiceLinesDeatails } from '../../api/claimDetailsApi';
import ServiceLinesEdit from './ServiceLinesEditComponent';
 import {formatDateToYYYYMMDD} from '../../utils/commonFunctions'


const ClaimDetailEdit = () => {
    const [activeTab, setActiveTab] = useState('CLAIM');
    const [claimData, setClaimData] = useState([]); 
    const [isDisables, setDisabled] = useState(false);
    const [serviceLinesData, setServiceLinesData] = useState([]);
    const { id } = useParams();
    const [userType, setUserType] = useState(null);
    const ediData = `
    ISA*00*          *00*          *ZZ*0022058        *ZZ*MMISODJFS      *240930*1740*^*00501*000005163*0*P*:~
    GS*HC*0022058*005010X2A1005010X222A1005010X220X222A1005010X222A1005010X222A1*20240930*1740*000005163*X*005010X222A1~
    ST*837*000005163*005010X222A1~
    BHT*0019*00*000005163*20240930*1740*CH~
    NM1*41*2*Test Practice*****46*0022058~
    PER*IC*Test  Practice*TE*9876543210*FX*9876543210~
    NM1*40*2*MMISODJFS*****46*MMISODJFS~
    HL*1**20*1~
    NM1*85*2*Test Practice*****XX*1234567890~
    N3*Address1.~ 
    N4*HENLEY*MO*650401234~
    REF*EI*1111~
    HL*2*1*22*0~
    SBR*P*18*******ZZ~
    NM1*IL*1*Mary*Test****MI*1236549870~
    N3*testaddress~
    N4*NEW ALBANY*OH*43054~
    DMG*D8*19850202*M~
    N3*P.O. Box 8730~
    N4*DAYTON*OH*45401~
    CLM*5163*249.00***81:B:1*Y*C*Y*Y~
    REF*X4*1351~
    HI*ABK:F11121~
    NM1*82*1*Mike*Provider**MS**XX*1234567890~
    PRV*PE*PXC*1234CA21~
    NM1*77*2*Test Practice*****XX*9875632410~
    N3*Test.~
    N4*ANCHORAGE*AK*99501~
    REF*LU*174001~
    LX*1~
    SV1*HC:G0482:SA*249.00*UN*1*11**1~
    DTP*472*RD8*20240117-20240117~
    REF*6R*679089~
    SE*32*000005163~
    GE*1*000005163~
    IEA*1*000005163~
    `;
    const getClaimDeatails = async () => {
        try {
            const response = await fetchCustomerClaimDetails(id)
            setClaimData(response[0]);
        } catch (err) {
            console.error('Error fetching claim data:', err)
        }
    }

    const formatDate = (value) => {
        const dateArray = value.split("-");
        return `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`;
    }

    const handleInputChange = (event,tab) => {
        const { name, value, type } = event.target;
        const updatedValue = type === "date" ? formatDate(value) : value;
        if(tab === "CLAIM"){
        setClaimData({
            ...claimData,
            [name]: updatedValue
        });
        }else if(tab === "SERVICE"){
           const  serviceData = serviceLinesData[0]
           const  updatedServiceData = {...serviceData, [name]: updatedValue}
           setServiceLinesData([updatedServiceData])
        }
    }

    const getServiceLinesDeatails = async () => {
        try {
            const response = await fetchServiceLinesDeatails(id)
            setServiceLinesData(response)
        } catch (err) {
            console.error('Error fetching claim data:', err)
        }
    }

    useEffect(() => {
        getClaimDeatails(id)
        getServiceLinesDeatails(id)
    }, [activeTab]); 

    useEffect(() => {
        const user = localStorage.getItem('userType');
        setUserType(user)
    }, [activeTab]);

    const ediLines = ediData.split('~').filter(line => line.trim() !== "");
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
                                                <div style={{ width: "50%" }}>
                                                    <input disabled={isDisables} type="text" name="claimId" value={(claimData?.claimId !== "" ? claimData?.claimId : "-")} onChange={(e)=>handleInputChange(e,"CLAIM")} />
                                                </div>
                                                <div className='claimdetails-value'>CLAIM ID </div>
                                            </div>
                                            <div className='text-start'>
                                                <div style={{ width: "50%" }}>
                                                    <input disabled={isDisables} type="text" name="claimFile" value={(claimData?.claimFile !== "" ? claimData?.claimFile : "-")} onChange={(e)=>handleInputChange(e,"CLAIM")} />
                                                </div>
                                                <div className='claimdetails-value'>CLAIM FILE</div>
                                            </div>
                                            <div className='text-start'>
                                                <div style={{ width: "50%" }}>
                                                    <input disabled={isDisables} type="text" name="claimNumber" value={(claimData?.claimNumber !== "" ? claimData?.claimNumber : "-")} onChange={(e)=>handleInputChange(e,"CLAIM")} />
                                                </div>

                                                <div className='claimdetails-value'>CLAIM NUMBER</div>
                                            </div>
                                            <div className='text-start'>
                                                <div style={{ width: "50%" }}>
                                                    <input disabled={isDisables} type="text" name="claimAmount" value={(claimData?.claimAmount !== "" ? claimData?.claimAmount : "-")} onChange={(e)=>handleInputChange(e,"CLAIM")} />

                                                </div>
                                                <div className='claimdetails-value'>CHARGE AMOUNT [28]</div>
                                            </div>
                                            <div className='text-start' >
                                                <div style={{ width: "50%" }}>
                                                    <input disabled={isDisables} type="text" name="placeOfService" value={(claimData?.placeOfService !== "" ? claimData?.placeOfService : "-")} onChange={(e)=>handleInputChange(e,"CLAIM")} />
                                                </div>
                                                <div className='claimdetails-value'>PLACE OF SERVICE [24 b]</div>
                                            </div>
                                            <div className='text-start' >
                                                <div style={{ width: "50%" }}>
                                                    <input disabled={isDisables} type="date" name="dateofService" value={(claimData?.dateofService !== "" ? formatDateToYYYYMMDD(claimData?.dateofService) : "-")} onChange={(e)=>handleInputChange(e,"CLAIM")} />
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
                                                    <input style={{ width: "100%" }} disabled={isDisables} name="billingProviderNPI" type="text" value={(claimData?.billingProviderNPI !== "" ? claimData.billingProviderNPI : "-")} onChange={(e)=>handleInputChange(e,"CLAIM")} />
                                                </div>
                                                <div className='claimdetails-value'>Billing Provider NPI [33 a]</div>
                                            </div>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>
                                                    <input style={{ width: "100%" }} disabled={isDisables} type="text" name="renderingProviderNPI" value={(claimData?.renderingProviderNPI !== "" ? claimData.renderingProviderNPI : "-")} onChange={(e)=>handleInputChange(e,"CLAIM")} />
                                                </div>
                                                <div className='claimdetails-value'>Rendering Provider NPI [24 j]</div>
                                            </div>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>
                                                    <input style={{ width: "100%" }} disabled={isDisables} type="text" name="billingProviderAddress1" value={(claimData?.billingProviderAddress1 !== "" ? claimData.billingProviderAddress1 : "-")} onChange={(e)=>handleInputChange(e,"CLAIM")} />
                                                </div>
                                                <div className='claimdetails-value'>Billing Provider Address [33]</div>
                                            </div>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>
                                                    <input style={{ width: "100%" }} disabled={isDisables} type="text" name="renderingProviderName" value={(claimData?.renderingProviderName !== "" ? claimData.renderingProviderName : "-")} onChange={(e)=>handleInputChange(e,"CLAIM")} />
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
                                                    <input style={{ width: "100%" }} disabled={isDisables} type="text" name="payerName" value={(claimData?.payerName !== "" ? claimData.payerName : "-")} onChange={(e)=>handleInputChange(e,"CLAIM")} />
                                                </div>
                                                <div className='claimdetails-value'>PAYER NAME [1]</div>
                                            </div>

                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>
                                                    <input style={{ width: "100%" }} disabled={isDisables} type="text" name="payerAddress" value={(claimData?.payerAddress !== "" ? claimData.payerAddress : "-")} onChange={(e)=>handleInputChange(e,"CLAIM")} />
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
                                                    <input style={{ width: "100%" }} disabled={isDisables} type="text" name="patientName" value={(claimData?.patientName !== "" ? claimData.patientName : "-")} onChange={(e)=>handleInputChange(e,"CLAIM")} />

                                                </div>
                                                <div className='claimdetails-value'>NAME  [2]</div>
                                            </div>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>
                                                    <input style={{ width: "100%" }} disabled={isDisables} type="text" name="memberId" value={(claimData?.memberId !== "" ? claimData.memberId : "-")} onChange={(e)=>handleInputChange(e,"CLAIM")} />

                                                </div>
                                                <div className='claimdetails-value'>POLICY NUMBER [1 a]</div>
                                            </div>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>
                                                    <input style={{ width: "100%" }} disabled={isDisables} type="text" name="patientGender" value={(claimData?.patientGender !== "" ? claimData.patientGender : "-")} onChange={(e)=>handleInputChange(e,"CLAIM")} />

                                                </div>
                                                <div className='claimdetails-value'> GENDER [3]</div>
                                            </div>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>
                                                    <input style={{ width: "100%" }} disabled={isDisables} type="date" name="patientDOB" value={(claimData?.patientDOB !== "" ? formatDateToYYYYMMDD(claimData.patientDOB) : "-")} onChange={(e)=>handleInputChange(e,"CLAIM")} />

                                                </div>
                                                <div className='claimdetails-value'> DATE OF BIRTH [3]</div>
                                            </div>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>
                                                    <input style={{ width: "100%" }} disabled={isDisables} type="text" name="subscriber" value={(claimData?.subscriber !== "" ? claimData.subscriber : "-")} onChange={(e)=>handleInputChange(e,"CLAIM")} />

                                                </div>
                                                <div className='claimdetails-value'>SUBSCRIBER [4]</div>
                                            </div>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>
                                                    <input style={{ width: "100%" }} disabled={isDisables} type="text" name="subscriberAddress" value={(claimData?.subscriberAddress !== "" ? claimData.subscriberAddress : "-")} onChange={(e)=>handleInputChange(e,"CLAIM")} />

                                                </div>
                                                <div className='claimdetails-value'>Subscriber Address [7]</div>
                                            </div>

                                        </div>
                                    </div>
                                </details>
                            </div>
                        </div>
                        <button className="btn btn-primary mt-2" onClick={() => {" handleSaveClaim()"}}>
                            SAVE
                        </button>
                    </div>
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
                                        <ServiceLinesEdit data={data} index={index} handleInputChange={handleInputChange}/>
                                        <button className="btn btn-primary mt-2" onClick={() => {" handleSaveClaim()"}}>
                                            SAVE
                                        </button>
                                    </>)
                                })}</> : <> No Data Found</>}
                    </>);
            case 'EDI VIEW':
                return (

                    <div className="section ">
                        <h3 className="section-header">EDI VIEW CONTENT</h3>
                        <div className="section-details custom-scroll text-start">
                            {ediLines.map((line, index) => (
                                <p key={index}>{line}</p>
                            ))}
                        </div>
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
                {/* {(userType && userType === 'Admin') && <button
                    className={`tab ${activeTab === 'EDI VIEW' ? 'active' : ''}`}
                    onClick={() => setActiveTab('EDI VIEW')}
                >
                    EDI VIEW
                </button>} */}

            </div>
            <div className="tab-content">
                {(claimData && Object.keys(claimData).length !== 0) && renderTabContent()}
            </div>
        </div>
    );
};

export default ClaimDetailEdit;