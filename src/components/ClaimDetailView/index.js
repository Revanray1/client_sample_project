import React, { useState, useEffect } from 'react';
import './ClaimDetailView.css';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCustomerClaimDetails,fetchServiceLinesDeatails } from '../../api/claimDetailsApi';
import ServiceLines from './ServiceLinesComponent';

const ClaimDetailView = () => {
    const [activeTab, setActiveTab] = useState('CLAIM');
    const [data, setData] = useState([]);
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
            console.log("response",response);
            setData(response[0]);
        } catch (err) {
            console.error('Error fetching claim data:', err)
        }
    }

    const getServiceLinesDeatails = async () => {
        try {
            const response = await fetchServiceLinesDeatails(id)
            console.log("response: " ,response)
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
                                        <div className = 'font-weight-bold fontsize-12 d-flex'>
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
                                                <div className='claimdetails-value'>CLAIM ID</div>
                                            </div>
                                            <div  className='text-start'>
                                            <div>{(data?.claimFile !== "" ? data?.claimFile : "-")}</div>
                                                <div className='claimdetails-value'>CLAIM FILE</div>
                                            </div>
                                            <div  className='text-start'>
                                                <div>{data?.claimNumber === "" ? "-" : data?.claimNumber}</div>
                                                <div className='claimdetails-value'>CLAIM NUMBER</div>
                                            </div>
                                            {/* <div  className='text-start'>
                                            <div>{data?.patControlNumber === "" ? "-" : data?.patControlNumber}</div>
                                                <div className='claimdetails-value'>PAT CONTROL NUMBER</div>
                                            </div>
                                            <div  className='text-start'>
                                            <div>{data?.sender === "" ? "-" : data?.sender}</div>
                                                <div className='claimdetails-value'>SENDER</div>
                                            </div>
                                            <div  className='text-start'>
                                            <div>{data?.receiver === "" ? "-" : data?.receiver}</div>
                                                <div className='claimdetails-value'>RECEIVER</div>
                                            </div> */}
                                            <div  className='text-start'>
                                            <div>{data?.claimAmount === "" ? "-" :  Number(data?.claimAmount).toFixed(2)}</div>
                                                <div className='claimdetails-value'>CHARGE AMOUNT</div>
                                            </div>
                                            <div  className='text-start'>
                                            <div>{data?.placeOfService === "" ? "-" : data?.placeOfService}</div>
                                                <div className='claimdetails-value'>PLACE OF SERVICE</div>
                                            </div>
                                            <div  className='text-start'>
                                                <div>{(data?.dateofService ? (data?.dateofService.split(" "))[0] : "-")}</div>
                                                <div className='claimdetails-value'>SERVICE DATE</div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </details>


                                <details className='details'>
                                     <summary className='claimdetails-summary-header mt-3'>
                                    <div className = 'font-weight-bold fontsize-12 d-flex'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                            </svg>
                                            <span>BILLING PROVIDER</span>
                                        </div>
                                    </summary>

                                    <div className='mt-3 overflow-auto'>
                                        <div className='claim-detail-child-div'>
                                            {/* <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{data?.billingProviderName === "" ? "-" : data?.billingProviderName}</div>
                                                <div className='claimdetails-value'>BUSINESS NAME</div>
                                            </div> */}
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{data?.billingProviderNPI === "" ? "-" : data?.billingProviderNPI}</div>
                                                <div className='claimdetails-value'>Billing Provider NPI</div>
                                            </div>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{data?.renderingProviderNPI === "" ? "-" : data?.renderingProviderNPI}</div>
                                                <div className='claimdetails-value'>Rendering Provider NPI</div>
                                            </div>
                                            {/* <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{data?.billingProviderName === "" ? "-" : data?.billingProviderName}</div>
                                                <div className='claimdetails-value'> Billing Provider Name</div>
                                            </div> */}
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                            <div>{data?.billingProviderAddress1 === "" ? "-" : data?.billingProviderAddress1}</div>
                                                <div className='claimdetails-value'>Billing Provider Address</div>
                                            </div>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{data?.renderingProviderName === "" ? "-" : data?.renderingProviderName}</div>
                                                <div className='claimdetails-value'> Rendering Provider Name</div>
                                            </div>
                                            {/* <div className="width-30 claim-detail-child-div-grid p-1" >
                                            <div>{data?.renderingProvAddress === "" ? "-" : data?.renderingProvAddress}</div>
                                                <div className='claimdetails-value'>Rendering Provider ADDRESS</div>
                                            </div> */}

                                        </div>
                                    </div>
                                </details>


                                <details className='details'>
                                     <summary className='claimdetails-summary-header mt-3'>
                                    <div className = 'font-weight-bold fontsize-12 d-flex'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                            </svg>
                                            <span>PAYER</span>
                                        </div>
                                    </summary>

                                    <div className='mt-3 overflow-auto'>
                                        <div className='claim-detail-child-div'>
                                            {/* <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{data?.payerId === "" ? "-" : data?.payerId}</div>
                                                <div className='claimdetails-value'>PAYER ID</div>
                                            </div> */}
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{data?.payerName === "" ? "-" : data?.payerName}</div>
                                                <div className='claimdetails-value'>PAYER NAME</div>
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
                                    <div className = 'font-weight-bold fontsize-12 d-flex'>
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
                                                <div className='claimdetails-value'>NAME</div>
                                            </div>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{data?.memberId === "" ? "-" : data?.memberId}</div>
                                                <div className='claimdetails-value'>POLICY NUMBER</div>
                                            </div>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                            <div>{data?.patientGender === "" ? "-" : data?.patientGender}</div>
                                                <div className='claimdetails-value'> GENDER</div>
                                            </div>
                                           <div className="width-30 claim-detail-child-div-grid p-1" >
                                            <div>{ data?.patientDOB === "" ? "-" : (data?.patientDOB?.split(" "))[0]}</div>
                                                <div className='claimdetails-value'> DATE OF BIRTH</div>
                                            </div>
                                              {/*<div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{data?.billingProviderAddress1 === "" ? "-" : data?.billingProviderAddress1}</div>
                                                <div className='claimdetails-value'>ADDRESS</div>
                                            </div> */}
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{data?.subscriber === "" ? "-" : data?.subscriber}</div>
                                                <div className='claimdetails-value'>SUBSCRIBER</div>
                                            </div>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{data?.subscriberAddress === "" ? "-" : data?.subscriberAddress}</div>
                                                <div className='claimdetails-value'>Subscriber Address</div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </details>
                            </div>
                        </div>

                        {/* {data.map((item, index) => (
                            <li key={index}>
                              //  Displaying claimNumber within various HTML tags
                                <div><span>6/3/24</span> <span>DATES</span></div>
                                <div><span>Office</span> <span>PLACE OF SERVICE</span></div>
                                <div><span>{item.claimNumber}</span> <span>CLAIM Number</span></div>
                                <div><span>{item.claimId}</span> <span>CLAIM ID</span></div>
                                <div><span>{item.patientName}</span> <span>Patient Name</span></div>
                                <div><span>$89</span> <span>CHARGE AMT</span></div>

                                <div><span>Paid</span> <span>STATUS</span></div>
                                <div><span>John Doe</span> <span>SUBSCRIBER</span></div>
                            </li>
                        ))} */}

                    </div>
                </>);
            case 'SERVICE LINES':
                return (
                    <>
                    {serviceLinesData .length > 0  ?
                    
                    <>{serviceLinesData . map((data,index)=>{
                        return (
                            <ServiceLines data={data} index={index}/>
                        )
                    })}</> : <> No Data Found</>}
                        
                                                    {/* 


                            <div className="line-item">
                                <div className="line-header">
                                    <span>LINE 1 (90853)</span>
                                    <span>UNIT: 1</span>
                                    <span>CHARGE AMOUNT: 89</span>
                                </div>
                                <div className="line-details">
                                    <span>$89.00</span> <span>1 UNIT</span> <span>6/3/24</span> <span>Office</span> <span>216654</span>
                                </div>
                                <div className="line-header">
                                    <span>LINE 2 (99213)</span>
                                    <span>UNIT: 1</span>
                                    <span>CHARGE AMOUNT: 75</span>
                                </div>
                                <div className="line-details">
                                    <span>$75.00</span> <span>1 UNIT</span> <span>6/3/24</span> <span>Office</span> <span>216655</span>
                                </div>
                            </div> */}
                       
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
                {(userType && userType === 'Admin') && <button
                    className={`tab ${activeTab === 'EDI VIEW' ? 'active' : ''}`}
                    onClick={() => setActiveTab('EDI VIEW')}
                >
                    EDI VIEW 
                </button>}

            </div>
            <div className="tab-content">
                {(data && Object.keys(data).length !== 0 )   && renderTabContent()} 
            </div>
        </div>
    );
};

export default ClaimDetailView;