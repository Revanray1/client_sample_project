
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
                                            <div  className='text-start'>
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
                                            </div>
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
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{data?.billingProviderName === "" ? "-" : data?.billingProviderName}</div>
                                                <div className='claimdetails-value'>BUSINESS NAME</div>
                                            </div>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{data?.billingProviderNPI === "" ? "-" : data?.billingProviderNPI}</div>
                                                <div className='claimdetails-value'>NPI</div>
                                            </div>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                            <div>{data?.billingProviderAddress1 === "" ? "-" : data?.billingProviderAddress1}</div>
                                                <div className='claimdetails-value'>ADDRESS</div>
                                            </div>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{data?.renderingProviderName === "" ? "-" : data?.renderingProviderName}</div>
                                                <div className='claimdetails-value'> RENDERING PROVIDER</div>
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
                                            <span>PAYER</span>
                                        </div>
                                    </summary>

                                    <div className='mt-3 overflow-auto'>
                                        <div className='claim-detail-child-div'>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{data?.payerId === "" ? "-" : data?.payerId}</div>
                                                <div className='claimdetails-value'>PAYER ID</div>
                                            </div>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{data?.payerName === "" ? "-" : data?.payerName}</div>
                                                <div className='claimdetails-value'>PAYER NAME</div>
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
                                                <div className='claimdetails-value'>MEMBER ID</div>
                                            </div>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                            <div>{data?.patientGender === "" ? "-" : data?.patientGender}</div>
                                                <div className='claimdetails-value'> GENDER</div>
                                            </div>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                            <div>{ data?.patientDOB === "" ? "-" : (data?.patientDOB?.split(" "))[0]}</div>
                                                <div className='claimdetails-value'> DATE OF BIRTH</div>
                                            </div>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{data?.billingProviderAddress1 === "" ? "-" : data?.billingProviderAddress1}</div>
                                                <div className='claimdetails-value'>ADDRESS</div>
                                            </div>
                                            <div className="width-30 claim-detail-child-div-grid p-1" >
                                                <div>{data?.subscriber === "" ? "-" : data?.subscriber}</div>
                                                <div className='claimdetails-value'>SUBSCRIBER</div>
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
                    <div className="section">
                        <h3 className="section-header">EDI VIEW CONTENT</h3>
                        <div className="section-details">
                            <span>Segment 1: NM1*IL*1*DOE*JOHN****MI*123456789</span>
                            <span>Segment 2: REF*SY*987654321</span>
                            <span>Segment 3: DTP*472*RD8*20240603-20240603</span>
                            <span>Segment 4: SVC*HC:99213*75*75**1</span>
                            <span>Segment 5: LQ*HE*Y4</span>
                            <span>Segment 6: SE*45*0001</span>
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

            </div>
            <div className="tab-content">
                {Object.keys(data).length !== 0  && renderTabContent()} 
            </div>
        </div>
    );
};

export default ClaimDetailView;
